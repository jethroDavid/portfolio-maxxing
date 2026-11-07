type Vertex = { x: number; y: number; z: number; u: number; v: number };
type Face = Vertex[];
type Line = [number, number, number, number];

const lerp = (a: number, b: number, t: number) => a + (b - a) * t;
function beat(t: number, a: number, b: number) {
  const n = Math.max(0, Math.min(1, (t - a) / (b - a)));
  return n * n * (3 - 2 * n);
}

// Split the sheet at a physical crease, keeping the printed coordinates on each piece.
function crease(faces: Face[], line: Line, angle: number): Face[] {
  if (Math.abs(angle) < .00001) return faces;
  const [x, y, endX, endY] = line;
  const length = Math.hypot(endX - x, endY - y);
  const dx = (endX - x) / length, dy = (endY - y) / length;
  const distance = (p: Vertex) => dx * (p.y - y) - dy * (p.x - x);
  const stationary: Face[] = [], moving: Face[] = [];
  for (const face of faces) {
    const fixed: Face = [], flap: Face = [];
    for (let i = 0; i < face.length; i++) {
      const a = face[i], b = face[(i + 1) % face.length];
      const da = distance(a), db = distance(b);
      if (da <= 1e-8) fixed.push(a);
      if (da >= -1e-8) flap.push(a);
      if (da * db < -1e-14) {
        const t = da / (da - db);
        const edge = {x:lerp(a.x,b.x,t), y:lerp(a.y,b.y,t), z:lerp(a.z,b.z,t), u:lerp(a.u,b.u,t), v:lerp(a.v,b.v,t)};
        fixed.push(edge); flap.push(edge);
      }
    }
    if (fixed.length >= 3) stationary.push(fixed);
    if (flap.length >= 3) moving.push(flap.map(p => {
      const d = distance(p);
      const offset = d * (Math.cos(angle) - 1) - p.z * Math.sin(angle);
      return {...p, x:p.x - dy * offset, y:p.y + dx * offset, z:d * Math.sin(angle) + p.z * Math.cos(angle)};
    }));
  }
  // When a stack folds over, its previous bottom layer becomes the top.
  if (Math.abs(angle) > Math.PI / 2) moving.reverse();
  return angle > 0 ? [...stationary, ...moving] : [...moving, ...stationary];
}

// Order the visible pieces against their actual planes. A long wing can be
// closer at its tip and farther away at its root than a neighbouring flap.
function paintOrder(faces: Face[]): Face[] {
  if (faces.length < 2) return faces;
  const [pivot, ...rest] = faces;
  const origin = pivot[0];
  let slopeX = 0, slopeY = 0, largest = 0;
  for (let i = 1; i < pivot.length - 1; i++) {
    const a = pivot[i], b = pivot[i + 1];
    const ax = a.x-origin.x, ay = a.y-origin.y, az = a.z-origin.z;
    const bx = b.x-origin.x, by = b.y-origin.y, bz = b.z-origin.z;
    const area = ax*by-ay*bx;
    if (Math.abs(area) <= largest) continue;
    largest = Math.abs(area);
    slopeX = (az*by-ay*bz)/area;
    slopeY = (ax*bz-az*bx)/area;
  }
  if (largest < .001) return paintOrder(rest);
  const behind: Face[] = [], level: Face[] = [pivot], ahead: Face[] = [];
  for (const face of rest) {
    const gaps = face.map(p => p.z-origin.z-slopeX*(p.x-origin.x)-slopeY*(p.y-origin.y));
    const front = gaps.some(d => d > 1e-7), back = gaps.some(d => d < -1e-7);
    if (!(front && back)) {
      (front ? ahead : back ? behind : level).push(face);
      continue;
    }
    const near: Face = [], far: Face = [];
    for (let i = 0; i < face.length; i++) {
      const j = (i+1)%face.length, a = face[i], b = face[j];
      const d = gaps[i], e = gaps[j];
      if (d >= -1e-7) near.push(a);
      if (d <= 1e-7) far.push(a);
      if ((d > 1e-7 && e < -1e-7) || (d < -1e-7 && e > 1e-7)) {
        const t = d/(d-e);
        const edge = {x:lerp(a.x,b.x,t), y:lerp(a.y,b.y,t), z:lerp(a.z,b.z,t), u:lerp(a.u,b.u,t), v:lerp(a.v,b.v,t)};
        near.push(edge); far.push(edge);
      }
    }
    if (near.length >= 3) ahead.push(near);
    if (far.length >= 3) behind.push(far);
  }
  return [...paintOrder(behind), ...level, ...paintOrder(ahead)];
}

// Mirror a small unprinted patch at its original pixel density to make the back.
const backs = new WeakMap<HTMLImageElement, HTMLCanvasElement>();
function paperBack(slip: HTMLImageElement) {
  const cached = backs.get(slip);
  if (cached) return cached;
  const back = document.createElement('canvas');
  back.width = slip.naturalWidth;
  back.height = slip.naturalHeight;
  const brush = back.getContext('2d')!;
  const tile = Math.max(1, Math.floor(back.height * .052));
  for (let y = 0; y < back.height; y += tile) {
    for (let x = 0; x < back.width; x += tile) {
      const column = x / tile, row = y / tile;
      const origin = (.18 + ((column * 13 + row * 7) % 29) / 50) * back.width;
      brush.save();
      brush.translate(x + (column % 2) * tile, y + (row % 2) * tile);
      brush.scale(column % 2 ? -1 : 1, row % 2 ? -1 : 1);
      brush.drawImage(slip, origin, back.height * .909, tile, tile, 0, 0, tile, tile);
      brush.restore();
    }
  }
  backs.set(slip, back);
  return back;
}

export function drawOrigami(ctx: CanvasRenderingContext2D, slip: HTMLImageElement, t: number, size: number, yaw: number, roll: number) {
  // The nose is the midpoint of the slip's right edge. Work in nose-up
  // coordinates but show the flat slip with the original lettering upright.
  const halfLength = .5;
  const halfSpan = slip.naturalHeight / slip.naturalWidth / 2;
  const sheet = [[-halfSpan,-halfLength],[halfSpan,-halfLength],[halfSpan,halfLength],[-halfSpan,halfLength]]
    .map(([x,y]) => ({x,y,z:0,u:.5-y,v:.5+x/(2*halfSpan)}));
  let faces: Face[] = [sheet];
  // Both pairs of folds share the exact nose. First bisect the square
  // corners, then bisect those 45-degree edges to form a long dart.
  const nose = -halfLength;
  const cornerY = nose + halfSpan;
  const tail = halfLength;
  const rearWidth = Math.tan(Math.PI / 8) * (tail - nose);
  const fold = (line: Line, start: number, end: number) => {
    faces = crease(faces, line, (Math.PI - .004) * beat(t,start,end));
  };
  fold([0,nose,-halfSpan,cornerY],0,.19);
  fold([halfSpan,cornerY,0,nose],.19,.40);
  fold([0,nose,-rearWidth,tail],.40,.53);
  fold([rearWidth,tail,0,nose],.53,.66);

  // Each wing and its half of the keel share a hinge at the nose. Split
  // the flat stack once, before any wing can move across the centre line.
  const open = beat(t,.66,.975);
  const keel = rearWidth * .32;
  const spine = 1.29 * open;
  if (open > 0) {
    const assemble = (side: number): Face[] => {
      const half: Face[] = [];
      for (const face of faces) {
        const polygon: Face = [];
        for (let i=0;i<face.length;i++) {
          const a=face[i], b=face[(i+1)%face.length];
          if (side*a.x >= 0) polygon.push(a);
          if (a.x*b.x < 0) {
            const t=-a.x/(b.x-a.x);
            polygon.push({x:0,y:lerp(a.y,b.y,t),z:lerp(a.z,b.z,t),u:lerp(a.u,b.u,t),v:lerp(a.v,b.v,t)});
          }
        }
        if (polygon.length >= 3) half.push(polygon);
      }
      const root: Line = side > 0 ? [keel,tail,0,nose] : [0,nose,-keel,tail];
      const wings = crease(half,root,1.80*open);
      const angle = side*spine;
      return wings.map(face=>face.map(p=>({...p,
        x:p.x*Math.cos(angle)+p.z*Math.sin(angle),
        z:-p.x*Math.sin(angle)+p.z*Math.cos(angle),
      })));
    };
    faces = [...assemble(-1), ...assemble(1)];
  }
  const turn = Math.PI / 2;
  const bank = roll + .59 * open;
  yaw += .37 * open;
  const projected = faces.map(face => face.map(p => {
    const x = p.x * Math.cos(turn) - p.y * Math.sin(turn);
    const y = p.x * Math.sin(turn) + p.y * Math.cos(turn);
    const yy = y * Math.cos(bank) - p.z * Math.sin(bank);
    const z = y * Math.sin(bank) + p.z * Math.cos(bank);
    return {...p,x:(x*Math.cos(yaw)+z*Math.sin(yaw))*size,y:yy*size,z:z*Math.cos(yaw)-x*Math.sin(yaw)};
  }));
  for (const face of paintOrder(projected)) {
    // All points on a face share one affine map. Choose the most stable triangle.
    const a = face[0];
    let b = face[1], c = face[2], det = 0;
    for (let i=1;i<face.length-1;i++) {
      const m=face[i], n=face[i+1];
      const area=(m.u-a.u)*(n.v-a.v)-(n.u-a.u)*(m.v-a.v);
      if (Math.abs(area)>Math.abs(det)) {det=area;b=m;c=n;}
    }
    if (Math.abs(det)<1e-8) continue;
    const ux=((b.x-a.x)*(c.v-a.v)-(c.x-a.x)*(b.v-a.v))/det;
    const uy=((b.y-a.y)*(c.v-a.v)-(c.y-a.y)*(b.v-a.v))/det;
    const vx=((c.x-a.x)*(b.u-a.u)-(b.x-a.x)*(c.u-a.u))/det;
    const vy=((c.y-a.y)*(b.u-a.u)-(b.y-a.y)*(c.u-a.u))/det;
    if(Math.abs(ux*vy-uy*vx)<.01) continue;
    ctx.save();
    ctx.beginPath();
    face.forEach((p,i)=> i ? ctx.lineTo(p.x,p.y) : ctx.moveTo(p.x,p.y));
    ctx.closePath(); ctx.clip();
    ctx.transform(ux,uy,vx,vy,a.x-ux*a.u-vx*a.v,a.y-uy*a.u-vy*a.v);
    const facing=(ux*vy-uy*vx)/(size*size*2*halfSpan);
    // Both sides block the layers beneath. Take the reverse texture from a
    // blank area of this same slip, so mirrored ink never appears on its back.
    ctx.fillStyle = '#e5c7a0';
    ctx.fillRect(0,0,1,1);
    ctx.drawImage(facing < 0 ? paperBack(slip) : slip,0,0,1,1);
    // A fixed light distinguishes the two wings even when their projected
    // areas match. Use their true camera-space normals for the shading.
    const abx=(b.x-a.x)/size, aby=(b.y-a.y)/size, abz=b.z-a.z;
    const acx=(c.x-a.x)/size, acy=(c.y-a.y)/size, acz=c.z-a.z;
    const nx=aby*acz-abz*acy, ny=abz*acx-abx*acz, nz=abx*acy-aby*acx;
    const normalLength=Math.hypot(nx,ny,nz);
    const light=Math.sign(nz)*(-.26*nx-.69*ny+.67*nz)/normalLength;
    ctx.fillStyle='rgba(85,53,27,'+ Math.max(0,.33*(.85-light)) +')';
    ctx.fillRect(0,0,1,1);
    ctx.restore();
  }
}
