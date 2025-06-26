export const BASE_URL = process.env.NEXT_PUBLIC_INTERNAL_URL;
export const API_BASE_PATH = `${BASE_URL}/api`;

export const API_LOGIN_PATH = `${API_BASE_PATH}/auth`;
export const API_REGISTER_PATH = `${API_BASE_PATH}/register`;
export const API_RELEASE_PATH = `${API_BASE_PATH}/release`;
export const API_OTP_PATH = `${API_BASE_PATH}/otp`;
export const API_OTP_VERIFY_PATH = `${API_BASE_PATH}/otp/verify`;
export const API_FORGET_PATH = `${API_BASE_PATH}/forget`;
export const API_FORGET_UPDATE_PATH = `${API_BASE_PATH}/forget/update`;

//Client's Route
export const API_CLIENT_PROFILE_PATH = `${API_BASE_PATH}/client/profile`;
export const API_CLIENT_POST_PROJECT_PATH = `${API_BASE_PATH}/client/post-project`;
export const API_CLIENT_ASSIGN_PROJECT_PATH = `${API_BASE_PATH}/client/assign-project`;
export const API_CLIENT_PROJECT_PATH = `${API_BASE_PATH}/client/projects`;

// Freelancer's Route
export const API_FREELANCER_PROJECT_BID_PATH = `${API_BASE_PATH}/freelancer/project-bid`;
export const API_FREELANCER_BUY_BIDS_PATH = `${API_BASE_PATH}/freelancer/buy-bids`;
// Freelancer's Route
export const API_FREELANCER_PROFILE_PATH = `${API_BASE_PATH}/freelancer/profile`;
export const API_FREELANCER_PROJECTS_PATH = `${API_BASE_PATH}/freelancer/projects`;
export const API_BIDS_BUY_PATH = `${API_BASE_PATH}/freelancer/bids/buy`;
export const API_CONVERSATION_CREATE = `${API_BASE_PATH}/conversation/create`;
export const API_CONVERSATION_GETALL = `${API_BASE_PATH}/conversation/getall`;
export const API_CONVERSATION_SEND = `${API_BASE_PATH}/conversation/send`;

//general projects route
export const API_PROJECTS_PATH = `${API_BASE_PATH}/projects`;
