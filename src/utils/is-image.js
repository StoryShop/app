const mimeTypes = [
  'image/x-windows-bmp',
  'image/bmp',
  'image/gif',
  'image/svg+xml',
  'image/tiff',
  'image/x-tiff',
  'image/png',
  'image/pjpeg',
  'image/jpeg',
];

export default mt => mimeTypes.indexOf( mt.toLowerCase() ) >= 0;

