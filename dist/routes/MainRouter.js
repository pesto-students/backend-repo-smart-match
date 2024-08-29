import { Router } from "express";
import AuthRoute from "./Auth.route.js";
const MainRouter = Router();
MainRouter.use("/auth", AuthRoute);
export default MainRouter;
//# sourceMappingURL=MainRouter.js.map