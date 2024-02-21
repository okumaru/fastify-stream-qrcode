import QRCode from 'qrcode';
import Fastify from 'fastify';
import fs from 'fs';

const app = Fastify({ logger: true });

app.get('/', async (request, reply) => {

  const text = "https://www.okumaru.my.id/";

  QRCode.toFile(
    'filename.png', 
    text, 
    {}, 
    function (err) {
      if (err) throw err

      fs.readFile('filename.png', (err, fileBuffer) => {
        reply.type('image/png');
        reply.send(err || fileBuffer);
      });

      console.log('done')
    }
  );

  return reply;
})

/**
 * Run the server!
 */
const start = async () => {
  try {
    await app.listen({ port: 3000 });
  } catch (err) {
    app.log.error(err);
    process.exit(1);
  }
}

start();