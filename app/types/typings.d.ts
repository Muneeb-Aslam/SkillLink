// interface IProject {
//    name: string;
//    postedOn: string;
//    tagIds: number[];
//    price: {
//       hourly: boolean;
//       value: number;
//       currency: string;
//    };
//    description: string;
// }
interface IProjectTagColor {
   background: string;
   foreground: string;
}
interface IProjectTag {
   id: number;
   name: string;
   background: string;
   foreground: string;
}

interface IProjectPriceRange {
   min: number;
   max: number;
   id: string;
}
interface IMessage {
   senderId: string;
   text: string;
   time: string;
}
interface IConversationDetails {}

type IUserRole = "freelancer" | "client";
interface IUserMini {
   name: string;
   role: IUserRole;
   profileImage: string;
   id: string;
}
interface IProjectMini {
   name: string;
   id: string;
}
interface IConversationFrontend {
   users: IUserMini[];
   _id: string;
   project: IProjectMini;
   lastMessage: string;
   lastMessageTime: string;
   project: IProjectMini;
   startedAt: string;
   messages: IMessage[];
}
interface IProjectFromBackend {
   clientId: string;
   freelancerId: string | null;
   title: string;
   budget: { from: number; to: number };
   skills: number[];
   categories: any;
   description: string;
   milestones: IMilestones | null;
   files: any | null;
   submittedFiles: any | null;
   _id: string;
}
