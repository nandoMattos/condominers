import { forbiddenError } from "../errors/forbidden-error";
import { notFoundError } from "../errors/not-found-error";
import reportRepository from "../repositories/reportRepository";
import userRepository from "../repositories/user-repository";

async function postReport(userId:number, description: string) {
  return await reportRepository.insertReport(userId, description);
}

async function getUserReports(userId:number, paramUserId:number, adminToken: string | undefined) {
  // a resident can only get his own reports, but an admin can get from anyone
  if((paramUserId !== userId) && !adminToken) {
    throw forbiddenError();
  }
  
  const user = await userRepository.findById(paramUserId);
  if(!user) {
    throw notFoundError();
  }


  return reportRepository.findAllByUserId(paramUserId);
}

async function markAsSolved(reportId: number) {
  const report = await reportRepository.findById(reportId);
  if(!report) throw notFoundError();

  return reportRepository.updateToSolved(reportId);
}

const reportService = {
  postReport,
  getUserReports,
  markAsSolved
};

export default reportService;