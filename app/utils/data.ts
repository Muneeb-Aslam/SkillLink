import { IProject } from "@/models/project";

export const projectTags: IProjectTag[] = [
   {
      id: 1,
      name: "web development",
      background: "#FFEBEE",
      foreground: "#D32F2F",
   }, // Very Light Red
   { id: 2, name: "frontend", background: "#E8F5E9", foreground: "#388E3C" }, // Very Light Green
   { id: 3, name: "backend", background: "#E3F2FD", foreground: "#1976D2" }, // Very Light Blue
   { id: 4, name: "mobile app", background: "#FFF8E1", foreground: "#FFA000" }, // Very Light Amber
   { id: 5, name: "UI/UX", background: "#F3E5F5", foreground: "#7B1FA2" }, // Very Light Purple
   { id: 6, name: "design", background: "#FFFDE7", foreground: "#FBC02D" }, // Very Light Yellow
   { id: 7, name: "SEO", background: "#FFCCBC", foreground: "#E64A19" }, // Very Light Orange
   {
      id: 8,
      name: "digital marketing",
      background: "#E0F2F1",
      foreground: "#00796B",
   }, // Very Light Teal
   {
      id: 9,
      name: "content writing",
      background: "#FCE4EC",
      foreground: "#8E24AA",
   }, // Very Light Pink
   { id: 10, name: "e-commerce", background: "#F9FBE7", foreground: "#AFB42B" }, // Very Light Lime
   { id: 11, name: "Shopify", background: "#FFF9C4", foreground: "#F57F17" }, // Very Light Lemon
   {
      id: 12,
      name: "data analysis",
      background: "#E1F5FE",
      foreground: "#0288D1",
   }, // Very Light Cyan
   {
      id: 13,
      name: "visualization",
      background: "#EDE7F6",
      foreground: "#5E35B1",
   }, // Very Light Indigo
   { id: 14, name: "Python", background: "#FFF3E0", foreground: "#F57C00" }, // Very Light Deep Orange
   { id: 15, name: "cloud", background: "#E3F2FD", foreground: "#1E88E5" }, // Very Light Light Blue
   { id: 16, name: "AWS", background: "#F1F8E9", foreground: "#7CB342" }, // Very Light Light Green
   {
      id: 17,
      name: "infrastructure",
      background: "#FFEB3B",
      foreground: "#FBC02D",
   }, // Very Light Yellow Dark
];

export const projectPriceRanges: IProjectPriceRange[] = [
   { id: "0", min: 1, max: 50 },
   { id: "1", min: 51, max: 250 },
   { id: "2", min: 251, max: 500 },
   { id: "3", min: 501, max: 1000 },
   { id: "4", min: 1000, max: 3000 },
   { id: "5", min: 3000, max: Infinity },
];
export const hourlyPriceRanges: IProjectPriceRange[] = [
   { id: "0", min: 1, max: 5 },
   { id: "1", min: 6, max: 10 },
   { id: "2", min: 11, max: 20 },
   { id: "3", min: 20, max: 50 },
   { id: "4", min: 50, max: Infinity },
];
export const dummyProjects: IProject[] = [];

export const dummyMiniConversations: IConversationMini[] = [
   {
      users: [
         {
            name: "Alice",
            role: "freelancer",
            profileImage: "alice.png",
            id: "u1",
         },
         { name: "Bob", role: "client", profileImage: "bob.png", id: "u2" },
      ],
      id: "c1",
      lastMessage: "Sure, what do you need?",
      lastMessageTime: "2024-05-25T10:15:00Z",
      startedAt: "2024-05-25T10:00:00Z",
      project: { name: "Website Redesign", id: "p1" },
   },
   {
      users: [
         {
            name: "Charlie",
            role: "freelancer",
            profileImage: "charlie.png",
            id: "u3",
         },
         { name: "David", role: "client", profileImage: "david.png", id: "u4" },
      ],
      id: "c2",
      lastMessage: "Perfect, keep me updated.",
      lastMessageTime: "2024-05-26T09:15:00Z",
      startedAt: "2024-05-26T09:00:00Z",
      project: { name: "Mobile App Development", id: "p2" },
   },
   {
      users: [
         { name: "Eve", role: "freelancer", profileImage: "eve.png", id: "u5" },
         { name: "Frank", role: "client", profileImage: "frank.png", id: "u6" },
      ],
      id: "c3",
      lastMessage: "Sounds good.",
      lastMessageTime: "2024-05-27T08:15:00Z",
      startedAt: "2024-05-27T08:00:00Z",
      project: { name: "Logo Design", id: "p3" },
   },
   {
      users: [
         {
            name: "Grace",
            role: "freelancer",
            profileImage: "grace.png",
            id: "u7",
         },
         { name: "Hank", role: "client", profileImage: "hank.png", id: "u8" },
      ],
      id: "c4",
      lastMessage: "Here you go.",
      lastMessageTime: "2024-05-28T07:15:00Z",
      startedAt: "2024-05-28T07:00:00Z",
      project: { name: "SEO Optimization", id: "p4" },
   },
   {
      users: [
         { name: "Ivy", role: "freelancer", profileImage: "ivy.png", id: "u9" },
         { name: "Jack", role: "client", profileImage: "jack.png", id: "u10" },
      ],
      id: "c5",
      lastMessage: "Thanks, looking forward to it.",
      lastMessageTime: "2024-05-29T06:15:00Z",
      startedAt: "2024-05-29T06:00:00Z",
      project: { name: "Content Writing", id: "p5" },
   },
   {
      users: [
         {
            name: "Kim",
            role: "freelancer",
            profileImage: "kim.png",
            id: "u11",
         },
         { name: "Liam", role: "client", profileImage: "liam.png", id: "u12" },
      ],
      id: "c6",
      lastMessage: "Sure, let's set up a meeting.",
      lastMessageTime: "2024-05-30T05:15:00Z",
      startedAt: "2024-05-30T05:00:00Z",
      project: { name: "Marketing Strategy", id: "p6" },
   },
   {
      users: [
         {
            name: "Mia",
            role: "freelancer",
            profileImage: "mia.png",
            id: "u13",
         },
         { name: "Noah", role: "client", profileImage: "noah.png", id: "u14" },
      ],
      id: "c7",
      lastMessage: "Looking forward to it.",
      lastMessageTime: "2024-05-31T04:15:00Z",
      startedAt: "2024-05-31T04:00:00Z",
      project: { name: "Product Photography", id: "p7" },
   },
   {
      users: [
         {
            name: "Olivia",
            role: "freelancer",
            profileImage: "olivia.png",
            id: "u15",
         },
         { name: "Paul", role: "client", profileImage: "paul.png", id: "u16" },
      ],
      id: "c8",
      lastMessage: "I'll send over the content calendar.",
      lastMessageTime: "2024-06-01T03:15:00Z",
      startedAt: "2024-06-01T03:00:00Z",
      project: { name: "Social Media Campaign", id: "p8" },
   },
   {
      users: [
         {
            name: "Quinn",
            role: "freelancer",
            profileImage: "quinn.png",
            id: "u17",
         },
         {
            name: "Rachel",
            role: "client",
            profileImage: "rachel.png",
            id: "u18",
         },
      ],
      id: "c9",
      lastMessage: "Thanks, can't wait to see it.",
      lastMessageTime: "2024-06-02T02:15:00Z",
      startedAt: "2024-06-02T02:00:00Z",
      project: { name: "Brand Identity", id: "p9" },
   },
   {
      users: [
         {
            name: "Sophia",
            role: "freelancer",
            profileImage: "sophia.png",
            id: "u19",
         },
         { name: "Tom", role: "client", profileImage: "tom.png", id: "u20" },
      ],
      id: "c10",
      lastMessage: "Thanks, looking forward to it.",
      lastMessageTime: "2024-06-03T01:15:00Z",
      startedAt: "2024-06-03T01:00:00Z",
      project: { name: "UI/UX Design", id: "p10" },
   },
];

export const dummyConversations: IConversation[] = [
   {
      users: [
         {
            name: "Alice",
            role: "freelancer",
            profileImage: "alice.png",
            id: "u1",
         },
         { name: "Bob", role: "client", profileImage: "bob.png", id: "u2" },
      ],
      id: "c1",
      project: { name: "Website Redesign", id: "p1" },
      messages: [
         {
            text: "Hello, how are you?",
            time: "2024-05-25T10:00:00Z",
            senderId: "u1",
         },
         {
            text: "I'm good, thank you!",
            time: "2024-05-25T10:05:00Z",
            senderId: "u2",
         },
         {
            text: "Great, let's discuss the project requirements.",
            time: "2024-05-25T10:10:00Z",
            senderId: "u1",
         },
         {
            text: "Great, let's discuss the project requirements.",
            time: "2024-05-25T10:10:00Z",
            senderId: "u1",
         },

         {
            text: "Great, let's discuss the project requirements.",
            time: "2024-05-25T10:10:00Z",
            senderId: "u1",
         },
         {
            text: "Great, let's discuss the project requirements.",
            time: "2024-05-25T10:10:00Z",
            senderId: "u1",
         },
         {
            text: "Great, let's discuss the project requirements.",
            time: "2024-05-25T10:10:00Z",
            senderId: "u1",
         },
         {
            text: "Great, let's discuss the project requirements.",
            time: "2024-05-25T10:10:00Z",
            senderId: "u1",
         },
         {
            text: "Sure, what do you need?",
            time: "2024-05-25T10:15:00Z",
            senderId: "u2",
         },
      ],
   },
   {
      users: [
         {
            name: "Charlie",
            role: "freelancer",
            profileImage: "charlie.png",
            id: "u3",
         },
         { name: "David", role: "client", profileImage: "david.png", id: "u4" },
      ],
      id: "c2",
      project: { name: "Mobile App Development", id: "p2" },
      messages: [
         {
            text: "When is the project deadline?",
            time: "2024-05-26T09:00:00Z",
            senderId: "u3",
         },
         {
            text: "We are aiming for the end of June.",
            time: "2024-05-26T09:05:00Z",
            senderId: "u4",
         },
         {
            text: "Got it. I'll start working on the wireframes.",
            time: "2024-05-26T09:10:00Z",
            senderId: "u3",
         },
         {
            text: "Perfect, keep me updated.",
            time: "2024-05-26T09:15:00Z",
            senderId: "u4",
         },
      ],
   },
   {
      users: [
         { name: "Eve", role: "freelancer", profileImage: "eve.png", id: "u5" },
         { name: "Frank", role: "client", profileImage: "frank.png", id: "u6" },
      ],
      id: "c3",
      project: { name: "Logo Design", id: "p3" },
      messages: [
         {
            text: "Can you share the brand guidelines?",
            time: "2024-05-27T08:00:00Z",
            senderId: "u5",
         },
         {
            text: "Sure, here they are.",
            time: "2024-05-27T08:05:00Z",
            senderId: "u6",
         },
         {
            text: "Thanks, I'll review them and get back to you.",
            time: "2024-05-27T08:10:00Z",
            senderId: "u5",
         },
         { text: "Sounds good.", time: "2024-05-27T08:15:00Z", senderId: "u6" },
      ],
   },
   {
      users: [
         {
            name: "Grace",
            role: "freelancer",
            profileImage: "grace.png",
            id: "u7",
         },
         { name: "Hank", role: "client", profileImage: "hank.png", id: "u8" },
      ],
      id: "c4",
      project: { name: "SEO Optimization", id: "p4" },
      messages: [
         {
            text: "Can we start with the keyword research?",
            time: "2024-05-28T07:00:00Z",
            senderId: "u7",
         },
         {
            text: "Yes, I have a list of potential keywords.",
            time: "2024-05-28T07:05:00Z",
            senderId: "u8",
         },
         {
            text: "Great, please share it.",
            time: "2024-05-28T07:10:00Z",
            senderId: "u7",
         },
         { text: "Here you go.", time: "2024-05-28T07:15:00Z", senderId: "u8" },
      ],
   },
   {
      users: [
         { name: "Ivy", role: "freelancer", profileImage: "ivy.png", id: "u9" },
         { name: "Jack", role: "client", profileImage: "jack.png", id: "u10" },
      ],
      id: "c5",
      project: { name: "Content Writing", id: "p5" },
      messages: [
         {
            text: "What's the word count for each article?",
            time: "2024-05-29T06:00:00Z",
            senderId: "u9",
         },
         {
            text: "Around 1500 words.",
            time: "2024-05-29T06:05:00Z",
            senderId: "u10",
         },
         {
            text: "Got it. I'll get started on the first one.",
            time: "2024-05-29T06:10:00Z",
            senderId: "u9",
         },
         {
            text: "Thanks, looking forward to it.",
            time: "2024-05-29T06:15:00Z",
            senderId: "u10",
         },
      ],
   },
   {
      users: [
         {
            name: "Kim",
            role: "freelancer",
            profileImage: "kim.png",
            id: "u11",
         },
         { name: "Liam", role: "client", profileImage: "liam.png", id: "u12" },
      ],
      id: "c6",
      project: { name: "Marketing Strategy", id: "p6" },
      messages: [
         {
            text: "Do you have any initial ideas?",
            time: "2024-05-30T05:00:00Z",
            senderId: "u11",
         },
         {
            text: "Yes, I have a few concepts in mind.",
            time: "2024-05-30T05:05:00Z",
            senderId: "u12",
         },
         {
            text: "Great, can we discuss them?",
            time: "2024-05-30T05:10:00Z",
            senderId: "u11",
         },
         {
            text: "Sure, let's set up a meeting.",
            time: "2024-05-30T05:15:00Z",
            senderId: "u12",
         },
      ],
   },
   {
      users: [
         {
            name: "Mia",
            role: "freelancer",
            profileImage: "mia.png",
            id: "u13",
         },
         { name: "Noah", role: "client", profileImage: "noah.png", id: "u14" },
      ],
      id: "c7",
      project: { name: "Product Photography", id: "p7" },
      messages: [
         {
            text: "What style of photos are you looking for?",
            time: "2024-05-31T04:00:00Z",
            senderId: "u13",
         },
         {
            text: "We need a clean, minimal look.",
            time: "2024-05-31T04:05:00Z",
            senderId: "u14",
         },
         {
            text: "Got it. I'll send over some samples.",
            time: "2024-05-31T04:10:00Z",
            senderId: "u13",
         },
         {
            text: "Looking forward to it.",
            time: "2024-05-31T04:15:00Z",
            senderId: "u14",
         },
      ],
   },
   {
      users: [
         {
            name: "Olivia",
            role: "freelancer",
            profileImage: "olivia.png",
            id: "u15",
         },
         { name: "Paul", role: "client", profileImage: "paul.png", id: "u16" },
      ],
      id: "c8",
      project: { name: "Social Media Campaign", id: "p8" },
      messages: [
         {
            text: "Can you handle Instagram and Facebook?",
            time: "2024-06-01T03:00:00Z",
            senderId: "u15",
         },
         {
            text: "Yes, I can manage both platforms.",
            time: "2024-06-01T03:05:00Z",
            senderId: "u16",
         },
         {
            text: "Great, let's get started with Instagram.",
            time: "2024-06-01T03:10:00Z",
            senderId: "u15",
         },
         {
            text: "I'll send over the content calendar.",
            time: "2024-06-01T03:15:00Z",
            senderId: "u16",
         },
      ],
   },
   {
      users: [
         {
            name: "Quinn",
            role: "freelancer",
            profileImage: "quinn.png",
            id: "u17",
         },
         {
            name: "Rachel",
            role: "client",
            profileImage: "rachel.png",
            id: "u18",
         },
      ],
      id: "c9",
      project: { name: "Brand Identity", id: "p9" },
      messages: [
         {
            text: "What are your brand values?",
            time: "2024-06-02T02:00:00Z",
            senderId: "u17",
         },
         {
            text: "We value sustainability and innovation.",
            time: "2024-06-02T02:05:00Z",
            senderId: "u18",
         },
         {
            text: "Got it. I'll incorporate that into the design.",
            time: "2024-06-02T02:10:00Z",
            senderId: "u17",
         },
         {
            text: "Thanks, can't wait to see it.",
            time: "2024-06-02T02:15:00Z",
            senderId: "u18",
         },
      ],
   },
   {
      users: [
         {
            name: "Sophia",
            role: "freelancer",
            profileImage: "sophia.png",
            id: "u19",
         },
         { name: "Tom", role: "client", profileImage: "tom.png", id: "u20" },
      ],
      id: "c10",
      project: { name: "UI/UX Design", id: "p10" },
      messages: [
         {
            text: "What's the target audience?",
            time: "2024-06-03T01:00:00Z",
            senderId: "u19",
         },
         {
            text: "Millennials and Gen Z.",
            time: "2024-06-03T01:05:00Z",
            senderId: "u20",
         },
         {
            text: "Okay, I'll tailor the design accordingly.",
            time: "2024-06-03T01:10:00Z",
            senderId: "u19",
         },
         {
            text: "Thanks, looking forward to it.",
            time: "2024-06-03T01:15:00Z",
            senderId: "u20",
         },
      ],
   },
];

export const START_CONVERSATION_MESSAGE =
   "Hi. I have seen your project. Lets discuss more about the project here";
