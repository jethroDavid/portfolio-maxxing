import { useEffect, useRef } from 'react';

import { drawOrigami } from './Origami';

const assets = ['dart-0', 'list', 'app', 'storefront', 'box'] as const;
type Asset = typeof assets[number];
type Images = Map<Asset, HTMLImageElement>;
type Point = { x: number; y: number };

const prompts = [
  'start with saturday morning at the counter and put the pickups in time order so the baker can see what needs packing next then keep the name and the number of boxes together',
  'let maya reserve a box on her phone and put that same order on the counter tablet once it is saved then try the last box from two phones and give the second customer another pickup time',
  'bring the pickup time beside the name and show this saturday’s pastries on the bakery site then make the reserve link open the same order flow and check how the photo fits on a small phone',
  'publish the storefront on the shop domain and follow maya’s order through pickup then print her name on the box and let the person at the counter mark it picked up',
];

const stops = [.22, .425, .625, .795, .86];

export function storySubtitle(p: number) {
  if (p < .08) return 'There’s something at work you keep having to do the hard way.';
  if (p < stops[1]) return 'You walk me through it. Together we figure out what would actually help.';
  if (p < stops[2]) return 'I build an app or system that helps you run your business.';
  if (p < stops[3]) return 'I build a website to help you market your business and reach new customers.';
  return 'I help you deploy it to production so your customers can start using it.';
}

function progressBetween(value: number, start: number, end: number) {
  return Math.max(0, Math.min(1, (value - start) / (end - start)));
}

function ease(value: number, start: number, end: number) {
  const t = progressBetween(value, start, end);
  return t * t * (3 - 2 * t);
}

function pose(progress: number, width: number, height: number) {
  // Coordinates describe the plane and its tail in the same local space as the artwork.
  const first = ease(progress, .22, .39);
  const second = ease(progress, .39, .60);
  const third = ease(progress, .60, .80);
  const climb = ease(progress, .795, .86);
  const turnLeft = ease(progress, .395, .445);
  const turnRight = ease(progress, .605, .655);
  const direction = Math.cos(Math.PI * (turnLeft - turnRight));
  const arc = Math.sin(Math.PI * first) + Math.sin(Math.PI * second) + Math.sin(Math.PI * third);
  const x = width * (.5 + first * .17 - second * .43 + third * .45 + climb * .09);
  const y = height * (.50 - arc * .16 + first * .025 - second * .055 + third * .03 - climb * 1.05);
  const rotation = -1.38 * ease(progress, .795, .835) - .18 * Math.sin(first * Math.PI * 2) + .18 * Math.sin(second * Math.PI * 2) - .15 * Math.sin(third * Math.PI * 2);
  const size = Math.min(width * .46, 320) * (1 - .32 * ease(progress,.23,.33));
  const tailX = -size * .39 * direction;
  const tailY = -size * .09;
  return {x, y, size, rotation, direction, tail: {
    x: x + tailX * Math.cos(rotation) - tailY * Math.sin(rotation),
    y: y + tailX * Math.sin(rotation) + tailY * Math.cos(rotation),
  }};
}

function drawObject(ctx: CanvasRenderingContext2D, images: Images, name: Asset, x: number, y: number, width: number, opacity = 1, rotation = 0, flip = 1, bank = 1) {
  const image = images.get(name);
  if (!image || opacity <= 0) return;
  const height = width * image.naturalHeight / image.naturalWidth;
  ctx.save();
  ctx.translate(x, y);
  ctx.rotate(rotation);
  ctx.scale(flip, bank);
  ctx.globalAlpha = opacity;
  ctx.globalCompositeOperation = 'source-over';
  ctx.drawImage(image, -width / 2, -height / 2, width, height);
  ctx.restore();
}

function drawTrail(ctx: CanvasRenderingContext2D, progress: number, width: number, height: number) {
    if (progress <= stops[0] || progress >= stops[4]) return;
    const current = pose(progress, width, height);
    ctx.font = (width < 650 ? 15 : 13) + 'px "Courier New", monospace';
    const stage = prompts.findIndex((_, i) => progress < stops[i + 1]);
    const revealed = prompts.slice(0, stage).join(' ') + (stage ? ' ' : '') +
      prompts[stage].slice(0, Math.floor(prompts[stage].length * progressBetween(progress, stops[stage], stops[stage+1])));
    const recent = revealed.trimEnd().split(' ').reverse();
    let distance = revealed.endsWith(' ') ? ctx.measureText(' ').width : 0;
    const reach = width * .86;

    const direction = current.direction;
    // Walk the curved exhaust in equal lengths so words keep their spacing through turns.
    const points: Point[] = [current.tail];
    const step = 5;
    for (let distance = step; distance < reach + 120; distance += step) {
      const earlier = pose(Math.max(.22, progress - distance / width * .15), width, height);
      const heading = Math.acos(earlier.direction);
      const wave = .22 * Math.cos(distance / width * 10 + progress * 6);
      const angle = Math.PI - heading + wave;
      const last = points[points.length - 1];
      points.push({x: last.x + Math.cos(angle) * step, y: last.y + Math.sin(angle) * step});
    }
    const trailPoint = (distance: number) => {
      const index = Math.min(points.length - 2, Math.floor(distance / step));
      const fraction = distance / step - index;
      return {
        x: points[index].x + (points[index + 1].x - points[index].x) * fraction,
        y: points[index].y + (points[index + 1].y - points[index].y) * fraction,
      };
    };
    ctx.save();
    ctx.fillStyle = '#403e42';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    for (const word of recent) {
      const wordWidth = ctx.measureText(word).width;
      const dist = distance + wordWidth / 2 + 4;
      if (dist >= reach) break;
      distance += wordWidth + ctx.measureText(' ').width;
      const point = trailPoint(dist);
      const nextPoint = trailPoint(dist + 2);
      const slope = Math.atan((nextPoint.y - point.y) / (nextPoint.x - point.x || .01));
      ctx.save();
      ctx.translate(point.x, point.y);
      ctx.rotate(Math.max(-.45, Math.min(.45, slope)));
      ctx.globalAlpha = Math.pow(Math.max(0, 1 - dist / reach), 1.4) * (.76 + .22 * Math.abs(direction)) * (1 - ease(progress, .838, .86));
      ctx.fillText(word, 0, 0);
      ctx.restore();
    }
    ctx.restore();
}

function paint(ctx: CanvasRenderingContext2D, images: Images, p: number, width: number, height: number, reduced: boolean) {
  ctx.clearRect(0, 0, width, height);
  const frame = Math.round(p * 640) / 640;
  const plane = pose(frame, width, height);
  const propWidth = Math.min(295, width * .37);
  const objectWidth = Math.min(propWidth, height * .44);
  const letterWidth = Math.min(width * .38, height * .29, 226);
  const gap = Math.min(width * .045, 38);
  const boxX = (width - letterWidth - gap) / 2;
  const letterX = (width + objectWidth + gap) / 2;
  const landingY = height * .5;
  const destinations: {name: Asset; start: number; end: number; x: number}[] = [
    {name:'list', start:.255, end:.455, x:.79},
    {name:'app', start:.425, end:.66, x:.24},
    {name:'storefront', start:.625, end:.86, x:.81},
    {name:'box', start:.825, end:2, x:boxX / width},
  ];
  for (const stop of destinations) {
    const arrival = ease(frame, stop.start, stop.start + .05);
    const departure = ease(frame, stop.end - .045, stop.end);
    const opacity = arrival * (1 - departure);
    const drift = (1 - arrival + departure) * (stop.x < .5 ? -.09 : .09);
    drawObject(ctx, images, stop.name, width * (stop.x + drift), stop.name === 'box' ? landingY : height * .60, objectWidth, opacity);
  }
  if (!reduced) drawTrail(ctx, p, width, height);
  const slip = images.get('dart-0');
  if (!slip) return;
  ctx.save();
  if (frame >= .86) {
    // Unfold above the viewport, then let the open letter glide into view.
    const fall = progressBetween(frame, .868, .979);
    const sway = Math.sin(fall * Math.PI * 2.8);
    const envelope = Math.sin(Math.PI * fall);
    const descent = ease(fall, 0, 1);
    const x = width * (.69 * (1 - descent) + .16 * envelope * sway) + letterX * descent;
    const y = height * (-.25 * (1 - descent) + .045 * envelope * Math.cos(fall * Math.PI * 5.6)) + landingY * descent;
    ctx.translate(x, y);
    ctx.rotate(envelope * (.60 * sway - .18));
    const unfolding = 1 - ease(frame, .86, .88);
    drawOrigami(ctx, slip, unfolding, letterWidth, 0,
      envelope * .78 * Math.cos(fall * Math.PI * 2.8));
  } else {
    const folded = progressBetween(frame, .018, .22);
    ctx.translate(plane.x, plane.y);
    ctx.rotate(plane.rotation);
    drawOrigami(ctx, slip, folded, Math.min(plane.size, height*.48),
      Math.acos(plane.direction), 2 * Math.PI * ease(frame, .796, .852));
  }
  ctx.restore();
}

export default function PaperScene({progress, reduced}: {progress: number; reduced: boolean}) {
  const canvas = useRef<HTMLCanvasElement>(null);
  const state = useRef({progress, reduced});
  state.current = {progress, reduced};
  useEffect(() => {
    const el = canvas.current;
    const ctx = el?.getContext('2d');
    if (!el || !ctx) return;
    const images: Images = new Map();

    let active = true;
    let visible = true;
    let handle = 0;

    let previous = -1;
    let width = 0;
    let height = 0;
    const render = () => {
      handle = 0;
      if (!active || !visible || document.hidden) return;
      const {progress, reduced} = state.current;
      if (progress !== previous) {
        paint(ctx, images, progress, width, height, reduced);
        previous = progress;
      }
    };
    function schedule() { if (active && visible && !handle) handle = requestAnimationFrame(render); }
    function invalidate() { previous = -1; schedule(); }
    function resize() {
      const bounds = el!.getBoundingClientRect();
      const pixelRatio = Math.min(devicePixelRatio || 1, 2);
      const scale = Math.min(1, bounds.width / 540);
      if (!scale) return;
      width = bounds.width / scale;
      height = bounds.height / scale;
      el!.width = Math.round(bounds.width * pixelRatio);
      el!.height = Math.round(bounds.height * pixelRatio);
      ctx!.setTransform(pixelRatio * scale, 0, 0, pixelRatio * scale, 0, 0);
      invalidate();
    }
    for (const name of assets) {
      const img = new Image();
      img.onload = () => { images.set(name, img); invalidate(); };
      img.src = '/bakery/' + name + '.webp';
    }
    const observer = new ResizeObserver(resize);
    observer.observe(el);
    const visibility = new IntersectionObserver(entries => {
      visible = entries[0].isIntersecting;
      if (visible) invalidate();
    });
    visibility.observe(el);
    el.addEventListener('storyframe', invalidate);
    document.addEventListener('visibilitychange', invalidate);
    resize();
    return () => {
      active = false;
      cancelAnimationFrame(handle);
      observer.disconnect();
      visibility.disconnect();
      el.removeEventListener('storyframe', invalidate);
      document.removeEventListener('visibilitychange', invalidate);
    };
  }, []);
  useEffect(() => { canvas.current?.dispatchEvent(new Event('storyframe')); }, [progress, reduced]);
  return <canvas ref={canvas} className="paper-scene" role="img" aria-label="An order slip folds into a plane and carries a bakery owner's idea through pickup planning, mobile ordering, a public storefront, and Maya's finished pastry box." />;
}
