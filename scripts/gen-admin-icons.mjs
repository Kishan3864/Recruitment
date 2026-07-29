import sharp from "sharp";

/*
 * Admin PWA icons — junction-language mark: ink field, dotted route curve,
 * amber node with white ring at the junction. Standard icons get rounded
 * corners; the maskable variant is full-bleed with the motif inside the
 * 80% safe zone.
 */

const motif = `
  <path d="M96 416 C 200 416, 312 96, 416 96" stroke="#93C5FD" stroke-width="14"
        stroke-linecap="round" stroke-dasharray="0.1 44" fill="none" opacity="0.85"/>
  <circle cx="96" cy="416" r="18" fill="#60A5FA" opacity="0.75"/>
  <circle cx="416" cy="96" r="18" fill="#60A5FA" opacity="0.75"/>
  <circle cx="256" cy="256" r="58" fill="#DAA83A" stroke="#FFFFFF" stroke-width="12"/>
  <circle cx="256" cy="256" r="20" fill="#FFFFFF"/>
`;

const standard = `<svg xmlns="http://www.w3.org/2000/svg" width="512" height="512">
  <rect width="512" height="512" rx="96" fill="#16233D"/>
  ${motif}
</svg>`;

const maskable = `<svg xmlns="http://www.w3.org/2000/svg" width="512" height="512">
  <rect width="512" height="512" fill="#16233D"/>
  <g transform="translate(51.2 51.2) scale(0.8)">${motif}</g>
</svg>`;

await sharp(Buffer.from(standard)).png().toFile("public/icons/admin-512.png");
await sharp(Buffer.from(standard)).resize(192, 192).png().toFile("public/icons/admin-192.png");
await sharp(Buffer.from(maskable)).png().toFile("public/icons/admin-maskable-512.png");
console.log("admin icons written");
