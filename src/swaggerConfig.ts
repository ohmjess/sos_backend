import swaggerJSDoc from 'swagger-jsdoc';

// ข้อมูลการตั้งค่า Swagger
const swaggerOptions = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'My API',
      version: '1.0.0',
      description: 'API Documentation for my Express project',
    },
    // servers: [
    //   {
    //     url: 'http://100.104.17.32:5000', // เปลี่ยนเป็น URL ของ backend API ของคุณ
    //     description: 'Local server',
    //   },
    // ],
  },
  apis: ['./src/routes/*.ts'], // ค้นหาไฟล์ .ts ทุกไฟล์ในโฟลเดอร์ routes
};

const swaggerSpec = swaggerJSDoc(swaggerOptions);

export default swaggerSpec;
