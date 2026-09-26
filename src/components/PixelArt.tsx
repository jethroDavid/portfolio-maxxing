export interface Sprite {
  map: string[];
  palette: Record<string, string>;
}

export const SPRITES: Record<string, Sprite> = {
  zerosum: {
    map: [
      '..............',
      '.....W........',
      '.....W........',
      '.....GG.......',
      '.W...GG..W....',
      '.W...GG..RR...',
      '.GG..GG..RR.W.',
      '.GG..W...RR.GG',
      '.GG......RR.GG',
      '.W.......W..GG',
      '..............',
      'WWWWWWWWWWWWWW',
    ],
    palette: { G: '#9ece6a', R: '#f7768e', W: '#565f89' },
  },
  'pineapple-agent': {
    map: [
      '.....GG.....',
      '....GGGG....',
      '..GG.GG.GG..',
      '...YYYYYY...',
      '..YYYYYYYY..',
      '..YOYOYOYO..',
      '..YYYYYYYY..',
      '..OYOYOYOY..',
      '..YYYYYYYY..',
      '..YOYOYOYO..',
      '..YYYYYYYY..',
      '...YYYYYY...',
      '....YYYY....',
    ],
    palette: { G: '#9ece6a', Y: '#e0af68', O: '#8a6d3b' },
  },
  'password-manager': {
    map: [
      '....SSSS....',
      '...SS..SS...',
      '...S....S...',
      '...S....S...',
      '..SS....SS..',
      '..BBBBBBBB..',
      '..BBBBBBBB..',
      '..BBBKKBBB..',
      '..BBBKKBBB..',
      '..BBBBKBBB..',
      '..BBBBKBBB..',
      '..BBBBBBBB..',
    ],
    palette: { S: '#c0caf5', B: '#7aa2f7', K: '#16161e' },
  },
  'automation-system': {
    map: [
      '.....AA.....',
      '.....AA.....',
      '.....RR.....',
      '..HHHHHHHH..',
      '.DHHHHHHHHHD',
      '.DHRRHHRRHD.',
      '.DHRRHHRRHD.',
      '.DHHHHHHHHHD',
      '.DHHKKKKHHD.',
      '..HHHHHHHH..',
      '...HHHHHH...',
      '............',
    ],
    palette: { A: '#565f89', R: '#f7768e', H: '#c0caf5', D: '#7aa2f7', K: '#16161e' },
  },
  noted: {
    map: [
      '..NNNNNNNN..',
      '..NNNNNNNN..',
      '..NDDDDDDN..',
      '..NNNNNNNN..',
      '..NDDDDNNN..',
      '..NNNNNNNN..',
      '..NDDDDDDN..',
      '..NNNNNNNN..',
      '..NNNNNNNW..',
      '..NNNNNNWWW.',
      '..NNNNNWWWW.',
      '............',
    ],
    palette: { N: '#e0af68', D: '#8a6d3b', W: '#e6e9f5' },
  },
};

export default function PixelArt({
  sprite,
  pixel = 8,
  animated = false,
}: {
  sprite: Sprite;
  pixel?: number;
  animated?: boolean;
}) {
  const rows = sprite.map.length;
  const cols = sprite.map[0]?.length ?? 0;
  return (
    <svg
      width={cols * pixel}
      height={rows * pixel}
      viewBox={`0 0 ${cols * pixel} ${rows * pixel}`}
      shapeRendering="crispEdges"
      aria-hidden="true"
    >
      {sprite.map.flatMap((row, y) =>
        row.split('').map((ch, x) => {
          if (ch === '.') return null;
          const fill = sprite.palette[ch];
          if (!fill) return null;
          return animated ? (
            <rect
              key={`${x}-${y}`}
              className="px"
              style={{ animationDelay: `${Math.min((x + y) * 40, 1000)}ms` }}
              x={x * pixel}
              y={y * pixel}
              width={pixel}
              height={pixel}
              fill={fill}
            />
          ) : (
            <rect
              key={`${x}-${y}`}
              x={x * pixel}
              y={y * pixel}
              width={pixel}
              height={pixel}
              fill={fill}
            />
          );
        }),
      )}
    </svg>
  );
}
