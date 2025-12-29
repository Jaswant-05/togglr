import prisma from "@workspace/db/client";
import { BadRequestError, NotFoundError } from "@workspace/errors/errors";
import { NextFunction, Request, Response, Router } from "express";
const router: Router = Router();

router.put('/project/:projectId/feature/:featureId', async (req: Request, res: Response, next: NextFunction) => {
  console.log("here");

  const featureId = req.params.featureId;
  const projectId = req.params.projectId;
  const enabled = req.body.enabled;

  if (!featureId || !projectId) throw new BadRequestError();

  try {
    const featureFlag = await prisma.featureFlag.findUnique({
      where: {
        id: featureId,
        projectId: projectId,
      }
    });

    if(!featureFlag) throw new NotFoundError();

    if (featureFlag.enabled == enabled) {
      return res.json({
        message: "Feature already in the correct state"
      });
    };

    await prisma.featureFlag.update({
      where: {
        id: featureFlag.id,
        projectId
      },
      data: {
        enabled : enabled
      }
    })

    res.json({
      message: "Feature updated",
      success: true
    });
    
  }
  catch (e: any) {
    console.log(e.message);
    next(e);
  }

})

export default router;