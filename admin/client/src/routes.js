import Dashboard from "views/maseeha/Dashboard.js"
import EmotionPacks from "views/maseeha/EmotionPacks"
import QAmanagement from "views/maseeha/QAmanagement"
import EmotionFlowAudioManagement from "views/maseeha/EmotionFlowAudioManagement"
import MeditationAudioManagement from "views/maseeha/MeditationAudioManagement"
import UserManagement from "views/maseeha/UserManagement"
import SplashManagement from "views/maseeha/SplashManagement"
import ReviewManagement from "views/maseeha/ReviewManagement"
import BlogManagement from "views/maseeha/BlogManagement/index"
import UserProfile from "views/UserProfile.js";
import OurTeamManagement from "views/maseeha/OurTeamManagement"
import ContactInfoManagement from "views/maseeha/ContactInfoManagement"
import ServiceManagement from "views/maseeha/ServiceManagement"
import HealthyLifeManagement from "views/maseeha/HealthyLifeManagement"
// import Journals from "views/maseeha/Journals"

const dashboardRoutes = [
  {
    path: "/dashboard",
    name: "Dashboard",
    icon: "nc-icon nc-chart-pie-35",
    component: Dashboard,
    layout: "/admin",
  },
  {
    path: "/emotionpacks",
    name: "Emotion Packs",
    icon: "nc-icon nc-satisfied",
    component: EmotionPacks,
    layout: "/admin",
  },
  {
    path: "/qamanagement",
    name: "QA Management",
    icon: "nc-icon nc-chat-round",
    component: QAmanagement,
    layout: "/admin",
  },
  {
    path: "/emotionflowaudiomanagement",
    name: "Emotion Audio",
    icon: "nc-icon nc-note-03",
    component: EmotionFlowAudioManagement,
    layout: "/admin",
  },
  {
    path: "/meditationaudiomanagement",
    name: "Meditation Audio",
    icon: "nc-icon nc-ambulance",
    component: MeditationAudioManagement,
    layout: "/admin",
  },
  {
    path: "/user",
    name: "User Management",
    icon: "nc-icon nc-circle-09",
    component: UserManagement,
    layout: "/admin",
  },
  {
    path: "/splash",
    name: "Splash Management",
    icon: "nc-icon nc-tv-2",
    component: SplashManagement,
    layout: "/admin",
  },
  {
    path: "/review",
    name: "Review Management",
    icon: "nc-icon nc-single-copy-04",
    component: ReviewManagement,
    layout: "/admin",
  },
  {
    path: "/profile",
    name: "User Profile",
    icon: "nc-icon nc-circle-09",
    component: UserProfile,
    layout: "/admin",
  },
  {
    path: "/blog",
    name: "Blog Mangement",
    icon: "nc-icon nc-notes",
    component: BlogManagement,
    layout: "/admin"
  },
  {
    path: "/ourTeam",
    name: "Our Team Mangement",
    icon: "nc-icon nc-group",
    component: OurTeamManagement,
    layout: "/admin"
  },
  {
    path: "/contactInfo",
    name: "Contact Info Mangement",
    icon: "nc-icon nc-group",
    component: ContactInfoManagement,
    layout: "/admin"
  },
  {
    path: "/service",
    name: "Our Services Mangement",
    icon: "nc-icon nc-group",
    component: ServiceManagement,
    layout: "/admin"
  },
  {
    path: "/healthyLife",
    name: "Healthy Lifes Mangement",
    icon: "nc-icon nc-group",
    component: HealthyLifeManagement,
    layout: "/admin"
  }
  // {
  //   path: "/journals",
  //   name: "Journals",
  //   icon: "nc-icon nc-circle-09",
  //   component: Journals,
  //   layout: "/admin"
  // }
]

export default dashboardRoutes
