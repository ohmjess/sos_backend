import app from "./app";
import { userRouter } from "./routes/user.routes" 
import { authRouter } from "./routes/auth.routes";
import { projectRouter } from "./routes/project.routes";
import { typeRouter } from "./routes/type.routes";
import { serviceReportRouter } from "./routes/serviceReport.routes";
import { dashboardRouter } from "./routes/dashboard.routes";
import swaggerUi from 'swagger-ui-express';
import swaggerSpec from './swaggerConfig';  // ไฟล์การตั้งค่า Swagger ที่สร้างขึ้น

// เส้นทางสำหรับแสดงผล Swagger UI
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.use("/api/users", userRouter);
app.use("/api/auth", authRouter);
app.use("/api/projects", projectRouter)
app.use("/api/types", typeRouter)
app.use("/api/serviceReport", serviceReportRouter)
app.use("/api/dashboard", dashboardRouter)