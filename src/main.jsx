import React, { useState } from "react";
import { createRoot } from "react-dom/client";
import {
  Activity, ArrowLeft, ArrowRight, ArrowUpRight, BarChart3, Bell, Briefcase, BriefcaseBusiness,
  Calendar, CalendarDays, Check, CheckCircle2, ChevronDown, ChevronLeft, ChevronRight, ChevronUp, CircleAlert,
  ClipboardList, Clock, Code2, Coins, Copy, CreditCard, Download, Edit2, ExternalLink, FileText, Filter, Home,
  Inbox, Info as InfoIcon, LayoutDashboard, LayoutGrid, Linkedin, Mail, MapPin, Menu, MoreHorizontal, MoreVertical, Phone, Plus,
  RefreshCw, Search, Send, Settings, ShieldCheck, SlidersHorizontal, Target, Trash2, Upload,
  User, UserPlus, Users, X, Zap
} from "lucide-react";
import "./styles.css";
import "./overlay.css";

/* ─── SEED DATA (19 JDs matching screenshot register) ─── */
const jobsSeed = [
  // Page 1 (matches reference screenshot exactly 100%):
  { id:"REQ-4482", title:"Senior Java Developer",    company:"Zenith Technologies", location:"Charlotte, NC", mode:"Hybrid",  source:"Email",  posted:"14 min ago",  state:"Consent In",       skills:["Java","Spring","AWS"],          exp:"8+ yrs", visa:"USC / GC", quality:0.82, benchShortlist:"14 → 6", consent:"2 in · 3 waiting · 1 declined" },
  { id:"REQ-4479", title:"Data Engineer (Snowflake)", company:"Apex Partners",       location:"Remote",       mode:"Remote",  source:"Portal", posted:"41 min ago",  state:"Consent In",       skills:["Snowflake","dbt","Python","AWS"],  exp:"6+ yrs", visa:"USC / GC", quality:0.91, benchShortlist:"9 → 4",  consent:"1 in · 3 waiting" },
  { id:"REQ-4475", title:"ServiceNow Admin",          company:"Nexus IT",            location:"Austin, TX",   mode:"Onsite",  source:"Email",  posted:"1 hr ago",    state:"Consent Sent",     skills:["Java","Spring","AWS"],          exp:"5+ yrs", visa:"GC",       quality:0.74, benchShortlist:"11 → 3", consent:"3 waiting" },
  { id:"REQ-4471", title:".NET Core Developer",       company:"Zenith Technologies", location:"Dallas, TX",   mode:"Hybrid",  source:"Email",  posted:"3 hr ago",    state:"Consent In",       skills:["Java","Spring","AWS"],          exp:"7+ yrs", visa:"USC / GC", quality:0.88, benchShortlist:"6 → 2",  consent:"1 in · 1 waiting" },
  { id:"REQ-4468", title:"Salesforce Admin",          company:"Meridian Global",     location:"Remote",       mode:"Remote",  source:"Portal", posted:"5 hr ago",    state:"Held Below Floor", skills:["Salesforce","Apex","Flows"],    exp:"5+ yrs", visa:"USC",      quality:0.69, benchShortlist:"—",      consent:"Held" },
  { id:"REQ-4462", title:"QA Automation (Selenium)",  company:"Apex Partners",       location:"Tampa, FL",    mode:"Hybrid",  source:"Email",  posted:"9 hr ago",    state:"Consent In",       skills:["Selenium","Cypress","Java"],    exp:"5+ yrs", visa:"GC / USC", quality:0.93, benchShortlist:"11 → 5", consent:"1 in · 2 waiting · 2 declined" },
  { id:"REQ-4459", title:"Senior Data Scientist",     company:"Helix Direct",        location:"Boston, MA",   mode:"Hybrid",  source:"Email",  posted:"19 hr ago",   state:"Consent Sent",     skills:["Python","ML","SQL","AWS"],      exp:"7+ yrs", visa:"USC / GC", quality:0.90, benchShortlist:"4 → 2",  consent:"2 waiting" },
  { id:"REQ-4453", title:"React Developer",           company:"Nexus IT",            location:"Remote",       mode:"Remote",  source:"Portal", posted:"2 days ago",  state:"No Match on Bench",skills:["React","TypeScript","Next.js"],  exp:"4+ yrs", visa:"USC",      quality:0.85, benchShortlist:"47 → 0", consent:"0 above the match floor" },
  // Additional items completing the 19 JDs register:
  { id:"REQ-4450", title:"Cloud Architect (AWS)",     company:"CloudScale Inc",      location:"Atlanta, GA",  mode:"Hybrid",  source:"Email",  posted:"2 days ago",  state:"Consent In",       skills:["AWS","Terraform","Cloud"],      exp:"9+ yrs", visa:"USC",      quality:0.94, benchShortlist:"8 → 3",  consent:"1 in · 2 waiting" },
  { id:"REQ-4447", title:"DevOps Engineer",           company:"Apex Partners",       location:"Chicago, IL",  mode:"Hybrid",  source:"Portal", posted:"2 days ago",  state:"Consent In",       skills:["Kubernetes","Docker","CI/CD"],  exp:"6+ yrs", visa:"GC",       quality:0.89, benchShortlist:"12 → 4", consent:"2 in · 1 waiting" },
  { id:"REQ-4445", title:"Full Stack Java / React",   company:"Zenith Technologies", location:"New York, NY", mode:"Hybrid",  source:"Email",  posted:"3 days ago",  state:"Consent Sent",     skills:["Java","React","PostgreSQL"],    exp:"8+ yrs", visa:"USC / GC", quality:0.86, benchShortlist:"15 → 5", consent:"3 waiting" },
  { id:"REQ-4440", title:"Data Analyst (PowerBI)",    company:"Helix Direct",        location:"Remote",       mode:"Remote",  source:"Portal", posted:"3 days ago",  state:"Consent Sent",     skills:["PowerBI","SQL","DAX"],          exp:"5+ yrs", visa:"USC",      quality:0.79, benchShortlist:"7 → 2",  consent:"1 waiting" },
  { id:"REQ-4438", title:"Python Backend Developer",  company:"Nexus IT",            location:"San Francisco, CA", mode:"Remote", source:"Email", posted:"3 days ago", state:"Consent In",   skills:["Python","FastAPI","Redis"],     exp:"6+ yrs", visa:"GC",       quality:0.92, benchShortlist:"10 → 4", consent:"2 in · 1 waiting" },
  { id:"REQ-4435", title:"Business Systems Analyst",  company:"Meridian Global",     location:"Philadelphia, PA", mode:"Onsite", source:"Email", posted:"4 days ago", state:"Consent Sent",   skills:["BRD","SQL","Visio"],            exp:"7+ yrs", visa:"USC",      quality:0.77, benchShortlist:"5 → 2",  consent:"2 waiting" },
  { id:"REQ-4432", title:"iOS Mobile Developer",      company:"Apex Partners",       location:"Remote",       mode:"Remote",  source:"Portal", posted:"4 days ago",  state:"No Match on Bench",skills:["Swift","SwiftUI","iOS"],        exp:"5+ yrs", visa:"USC",      quality:0.83, benchShortlist:"47 → 0", consent:"0 above the match floor" },
  { id:"REQ-4429", title:"Kubernetes / SRE Lead",     company:"CloudScale Inc",      location:"Seattle, WA",  mode:"Hybrid",  source:"Email",  posted:"4 days ago",  state:"Consent In",       skills:["Kubernetes","Go","Prometheus"],  exp:"8+ yrs", visa:"USC / GC", quality:0.91, benchShortlist:"6 → 3",  consent:"1 in · 2 waiting" },
  { id:"REQ-4425", title:"Security Compliance Analyst",company:"Zenith Technologies",location:"McLean, VA", mode:"Hybrid",   source:"Email",  posted:"5 days ago",  state:"Consent Sent",     skills:["SOC2","NIST","AWS Security"],   exp:"6+ yrs", visa:"USC",      quality:0.80, benchShortlist:"4 → 1",  consent:"1 waiting" },
  { id:"REQ-4420", title:"Angular Frontend Engineer", company:"Nexus IT",            location:"Denver, CO",   mode:"Remote",  source:"Portal", posted:"5 days ago",  state:"No Match on Bench",skills:["Angular","TypeScript","RxJS"],   exp:"5+ yrs", visa:"USC",      quality:0.81, benchShortlist:"47 → 0", consent:"0 above the match floor" },
  { id:"REQ-4416", title:"Golang Microservices Lead", company:"Helix Direct",        location:"Austin, TX",   mode:"Hybrid",  source:"Email",  posted:"6 days ago",  state:"Consent In",       skills:["Go","gRPC","Docker","Kafka"],   exp:"7+ yrs", visa:"GC",       quality:0.87, benchShortlist:"8 → 3",  consent:"1 in · 1 waiting" },
];

const consultantsSeed = [
  // Page 1 (matches reference screenshot exactly 100%):
  {
    id: "C-1042",
    name: "Ramesh Kulkarni",
    initials: "RK",
    location: "Charlotte, NC",
    years: 11,
    skills: ["Java", "Spring Boot", "AWS"],
    available: "Now",
    availability: "Now",
    auth: "GC",
    visa: "GC",
    benchAge: 18,
    benchDays: 18,
    benchAgeStr: "18 d",
    consentReq: "3 this week",
    consentSub: "1 consented",
    state: "Ready to Submit",
    status: "Ready to Submit",
    type: "Internal",
    rate: 78,
    role: "Senior Java Developer — Zenith",
    staleResume: false,
    passedAvail: false,
    noReply: false,
  },
  {
    id: "C-1038",
    name: "Sofia Mendes",
    initials: "SM",
    location: "Remote",
    years: 9,
    skills: ["Java", "Kafka", "Kubernetes"],
    available: "22 Sep",
    availability: "22 Sep",
    auth: "USC",
    visa: "USC",
    benchAge: 9,
    benchDays: 9,
    benchAgeStr: "9 d",
    consentReq: "2 this week",
    consentSub: "1 consented",
    state: "Ready to Submit",
    status: "Ready to Submit",
    type: "Internal",
    rate: 82,
    role: "Senior Java Developer — Zenith",
    staleResume: false,
    passedAvail: true,
    noReply: false,
  },
  {
    id: "C-1031",
    name: "Ajay Verma",
    initials: "AV",
    location: "Dallas, TX",
    years: 8,
    skills: ["Java", "Spring", "Oracle"],
    available: "Now",
    availability: "Now",
    auth: "GC",
    visa: "GC",
    benchAge: 41,
    benchDays: 41,
    benchAgeStr: "41 d",
    consentReq: "4 this week",
    consentSub: "0 replies",
    state: "Awaiting Consent",
    status: "Awaiting Consent",
    type: "External",
    rate: 76,
    role: "Senior Java Developer",
    staleResume: false,
    passedAvail: false,
    noReply: true,
  },
  {
    id: "C-1027",
    name: "Daniel Okonkwo",
    initials: "DO",
    location: "Austin, TX",
    years: 7,
    skills: ["ServiceNow", "ITSM", "ITIL"],
    available: "Now",
    availability: "Now",
    auth: "H-1B",
    visa: "H-1B",
    benchAge: 62,
    benchDays: 62,
    benchAgeStr: "62 d",
    consentReq: "1 this week",
    consentSub: "1 consented",
    state: "Interview Set",
    status: "Interview Set",
    type: "External",
    rate: 71,
    role: "ServiceNow Admin",
    staleResume: false,
    passedAvail: false,
    noReply: false,
  },
  {
    id: "C-1022",
    name: "Meera Iyer",
    initials: "MI",
    location: "Remote",
    years: 6,
    skills: ["Snowflake", "dbt", "Python"],
    available: "Now",
    availability: "Now",
    auth: "USC",
    visa: "USC",
    benchAge: 5,
    benchDays: 5,
    benchAgeStr: "5 d",
    consentReq: "2 this week",
    consentSub: "1 consented",
    state: "Ready to Submit",
    status: "Ready to Submit",
    type: "Internal",
    rate: 72,
    role: "Data Engineer — Apex Partners",
    staleResume: false,
    passedAvail: false,
    noReply: false,
  },
  {
    id: "C-1019",
    name: "Nadia Haddad",
    initials: "NH",
    location: "Tampa, FL",
    years: 8,
    skills: ["Selenium", "Cypress"],
    available: "15 Sep",
    availability: "15 Sep",
    auth: "GC",
    visa: "GC",
    benchAge: 71,
    benchDays: 71,
    benchAgeStr: "71 d",
    consentReq: "5 this week",
    consentSub: "1 consented",
    state: "Ready to Submit",
    status: "Ready to Submit",
    type: "External",
    rate: 68,
    role: "QA Automation — Apex Partners",
    staleResume: false,
    passedAvail: true,
    noReply: false,
  },
  {
    id: "C-1014",
    name: "Vikram Rao",
    initials: "VR",
    location: "Charlotte, NC",
    years: 10,
    skills: ["Java", "Spring Boot", "Kafka"],
    available: "Now",
    availability: "Now",
    auth: "GC",
    visa: "GC",
    benchAge: 12,
    benchDays: 12,
    benchAgeStr: "12 d",
    consentReq: "3 this week",
    consentSub: "2 declined",
    state: "Available",
    status: "Available",
    type: "Internal",
    rate: 80,
    role: "Senior Java Developer",
    staleResume: false,
    passedAvail: false,
    noReply: false,
  },

  // Page 2 (8–14):
  {
    id: "C-1033",
    name: "Tobias Lang",
    initials: "TL",
    location: "Dallas, TX",
    years: 7,
    skills: [".NET", "C#", "Azure", "SQL"],
    available: "Now",
    availability: "Now",
    auth: "H-1B",
    visa: "H-1B",
    benchAge: 30,
    benchDays: 30,
    benchAgeStr: "30 d",
    consentReq: "2 this week",
    consentSub: "1 consented",
    state: "Ready to Submit",
    status: "Ready to Submit",
    type: "External",
    rate: 71,
    role: ".NET Core Developer — Zenith",
    staleResume: true,
    passedAvail: false,
    noReply: false,
  },
  {
    id: "C-1008",
    name: "Priya Nair",
    initials: "PN",
    location: "Raleigh, NC",
    years: 7,
    skills: ["Java", "Microservices", "AWS"],
    available: "29 Sep",
    availability: "29 Sep",
    auth: "USC",
    visa: "USC",
    benchAge: 24,
    benchDays: 24,
    benchAgeStr: "24 d",
    consentReq: "2 this week",
    consentSub: "1 consented",
    state: "Available",
    status: "Available",
    type: "Internal",
    rate: 79,
    role: "Java Developer",
    staleResume: false,
    passedAvail: false,
    noReply: false,
  },
  {
    id: "C-1007",
    name: "Carlos Rivera",
    initials: "CR",
    location: "Atlanta, GA",
    years: 6,
    skills: ["Python", "FastAPI", "Docker"],
    available: "Now",
    availability: "Now",
    auth: "GC",
    visa: "GC",
    benchAge: 38,
    benchDays: 38,
    benchAgeStr: "38 d",
    consentReq: "3 this week",
    consentSub: "1 consented",
    state: "Ready to Submit",
    status: "Ready to Submit",
    type: "Internal",
    rate: 74,
    role: "Python Backend Developer",
    staleResume: false,
    passedAvail: false,
    noReply: false,
  },
  {
    id: "C-1006",
    name: "Ananya Sharma",
    initials: "AS",
    location: "Chicago, IL",
    years: 9,
    skills: ["React", "TypeScript", "Node.js"],
    available: "Now",
    availability: "Now",
    auth: "USC",
    visa: "USC",
    benchAge: 14,
    benchDays: 14,
    benchAgeStr: "14 d",
    consentReq: "4 this week",
    consentSub: "2 consented",
    state: "Ready to Submit",
    status: "Ready to Submit",
    type: "Internal",
    rate: 85,
    role: "Lead Frontend Engineer",
    staleResume: false,
    passedAvail: false,
    noReply: false,
  },
  {
    id: "C-1005",
    name: "Marcus Chen",
    initials: "MC",
    location: "San Jose, CA",
    years: 8,
    skills: ["Go", "Kubernetes", "Cloud"],
    available: "Now",
    availability: "Now",
    auth: "GC",
    visa: "GC",
    benchAge: 45,
    benchDays: 45,
    benchAgeStr: "45 d",
    consentReq: "2 this week",
    consentSub: "1 consented",
    state: "Awaiting Consent",
    status: "Awaiting Consent",
    type: "External",
    rate: 88,
    role: "Cloud Native Engineer",
    staleResume: false,
    passedAvail: false,
    noReply: false,
  },
  {
    id: "C-1004",
    name: "Elena Rostova",
    initials: "ER",
    location: "Boston, MA",
    years: 7,
    skills: ["Salesforce", "Apex", "Lightning"],
    available: "Now",
    availability: "Now",
    auth: "USC",
    visa: "USC",
    benchAge: 22,
    benchDays: 22,
    benchAgeStr: "22 d",
    consentReq: "1 this week",
    consentSub: "1 consented",
    state: "Ready to Submit",
    status: "Ready to Submit",
    type: "Internal",
    rate: 76,
    role: "Salesforce Specialist",
    staleResume: true,
    passedAvail: false,
    noReply: false,
  },
  {
    id: "C-1003",
    name: "Devendra Patel",
    initials: "DP",
    location: "Houston, TX",
    years: 10,
    skills: ["SAP", "ABAP", "HANA"],
    available: "Now",
    availability: "Now",
    auth: "H-1B",
    visa: "H-1B",
    benchAge: 66,
    benchDays: 66,
    benchAgeStr: "66 d",
    consentReq: "2 this week",
    consentSub: "1 consented",
    state: "Interview Set",
    status: "Interview Set",
    type: "External",
    rate: 80,
    role: "SAP Solutions Consultant",
    staleResume: false,
    passedAvail: false,
    noReply: false,
  },

  // Page 3 (15–21):
  {
    id: "C-1002",
    name: "Sarah Jenkins",
    initials: "SJ",
    location: "Denver, CO",
    years: 5,
    skills: ["Angular", "JavaScript", "CSS"],
    available: "18 Sep",
    availability: "18 Sep",
    auth: "USC",
    visa: "USC",
    benchAge: 28,
    benchDays: 28,
    benchAgeStr: "28 d",
    consentReq: "3 this week",
    consentSub: "1 consented",
    state: "Available",
    status: "Available",
    type: "Internal",
    rate: 70,
    role: "Frontend Developer",
    staleResume: false,
    passedAvail: true,
    noReply: false,
  },
  {
    id: "C-1001",
    name: "Karthik Subramaniam",
    initials: "KS",
    location: "Edison, NJ",
    years: 12,
    skills: ["Java", "Spring Boot", "Microservices"],
    available: "Now",
    availability: "Now",
    auth: "GC",
    visa: "GC",
    benchAge: 19,
    benchDays: 19,
    benchAgeStr: "19 d",
    consentReq: "2 this week",
    consentSub: "1 consented",
    state: "Ready to Submit",
    status: "Ready to Submit",
    type: "Internal",
    rate: 82,
    role: "Java Architect",
    staleResume: false,
    passedAvail: false,
    noReply: false,
  },
  {
    id: "C-1000",
    name: "Fatima Al-Mansoor",
    initials: "FA",
    location: "New York, NY",
    years: 6,
    skills: ["Tableau", "SQL", "PowerBI"],
    available: "Now",
    availability: "Now",
    auth: "USC",
    visa: "USC",
    benchAge: 8,
    benchDays: 8,
    benchAgeStr: "8 d",
    consentReq: "4 this week",
    consentSub: "2 consented",
    state: "Ready to Submit",
    status: "Ready to Submit",
    type: "Internal",
    rate: 75,
    role: "BI & Data Analyst",
    staleResume: false,
    passedAvail: false,
    noReply: false,
  },
  {
    id: "C-0999",
    name: "Lucas Silva",
    initials: "LS",
    location: "Remote",
    years: 7,
    skills: ["AWS", "Terraform", "DevOps"],
    available: "Now",
    availability: "Now",
    auth: "GC",
    visa: "GC",
    benchAge: 52,
    benchDays: 52,
    benchAgeStr: "52 d",
    consentReq: "1 this week",
    consentSub: "1 consented",
    state: "Awaiting Consent",
    status: "Awaiting Consent",
    type: "External",
    rate: 78,
    role: "DevOps Engineer",
    staleResume: false,
    passedAvail: false,
    noReply: false,
  },
  {
    id: "C-0998",
    name: "Jason Miller",
    initials: "JM",
    location: "Austin, TX",
    years: 8,
    skills: ["Python", "Django", "PostgreSQL"],
    available: "Now",
    availability: "Now",
    auth: "USC",
    visa: "USC",
    benchAge: 15,
    benchDays: 15,
    benchAgeStr: "15 d",
    consentReq: "2 this week",
    consentSub: "1 consented",
    state: "Ready to Submit",
    status: "Ready to Submit",
    type: "Internal",
    rate: 77,
    role: "Backend Engineer",
    staleResume: false,
    passedAvail: false,
    noReply: false,
  },
  {
    id: "C-0997",
    name: "Sneha Reddy",
    initials: "SR",
    location: "Phoenix, AZ",
    years: 9,
    skills: ["Data Science", "ML", "PyTorch"],
    available: "Now",
    availability: "Now",
    auth: "H-1B",
    visa: "H-1B",
    benchAge: 34,
    benchDays: 34,
    benchAgeStr: "34 d",
    consentReq: "3 this week",
    consentSub: "0 replies",
    state: "Awaiting Consent",
    status: "Awaiting Consent",
    type: "External",
    rate: 84,
    role: "Lead Data Scientist",
    staleResume: false,
    passedAvail: false,
    noReply: true,
  },
  {
    id: "C-0996",
    name: "David O'Connor",
    initials: "DO",
    location: "Minneapolis, MN",
    years: 6,
    skills: ["QA Automation", "Cypress", "Playwright"],
    available: "Now",
    availability: "Now",
    auth: "GC",
    visa: "GC",
    benchAge: 26,
    benchDays: 26,
    benchAgeStr: "26 d",
    consentReq: "1 this week",
    consentSub: "1 consented",
    state: "Ready to Submit",
    status: "Ready to Submit",
    type: "External",
    rate: 69,
    role: "SDET Lead",
    staleResume: false,
    passedAvail: false,
    noReply: false,
  },

  // Page 4 (22–28):
  {
    id: "C-0995",
    name: "Wei Zhang",
    initials: "WZ",
    location: "Seattle, WA",
    years: 11,
    skills: ["Distributed Systems", "Go", "Kafka"],
    available: "Now",
    availability: "Now",
    auth: "USC",
    visa: "USC",
    benchAge: 94,
    benchDays: 94,
    benchAgeStr: "94 d",
    consentReq: "2 this week",
    consentSub: "1 consented",
    state: "Ready to Submit",
    status: "Ready to Submit",
    type: "Internal",
    rate: 90,
    role: "Principal Systems Engineer",
    staleResume: false,
    passedAvail: false,
    noReply: false,
  },
  {
    id: "C-0994",
    name: "Amara Okafor",
    initials: "AO",
    location: "Dallas, TX",
    years: 5,
    skills: ["Business Analysis", "Agile", "Jira"],
    available: "Now",
    availability: "Now",
    auth: "GC",
    visa: "GC",
    benchAge: 11,
    benchDays: 11,
    benchAgeStr: "11 d",
    consentReq: "3 this week",
    consentSub: "1 consented",
    state: "Available",
    status: "Available",
    type: "Internal",
    rate: 68,
    role: "Technical Business Analyst",
    staleResume: false,
    passedAvail: false,
    noReply: false,
  },
  {
    id: "C-0993",
    name: "Rahul Joshi",
    initials: "RJ",
    location: "Charlotte, NC",
    years: 8,
    skills: ["Full Stack Java", "React", "SQL"],
    available: "Now",
    availability: "Now",
    auth: "H-1B",
    visa: "H-1B",
    benchAge: 29,
    benchDays: 29,
    benchAgeStr: "29 d",
    consentReq: "2 this week",
    consentSub: "1 consented",
    state: "Ready to Submit",
    status: "Ready to Submit",
    type: "External",
    rate: 75,
    role: "Full Stack Engineer",
    staleResume: false,
    passedAvail: false,
    noReply: false,
  },
  {
    id: "C-0992",
    name: "Chloe Dupont",
    initials: "CD",
    location: "Remote",
    years: 7,
    skills: ["UI/UX", "Figma", "React"],
    available: "Now",
    availability: "Now",
    auth: "USC",
    visa: "USC",
    benchAge: 16,
    benchDays: 16,
    benchAgeStr: "16 d",
    consentReq: "1 this week",
    consentSub: "1 consented",
    state: "Ready to Submit",
    status: "Ready to Submit",
    type: "Internal",
    rate: 73,
    role: "Product Designer / UI",
    staleResume: true,
    passedAvail: false,
    noReply: false,
  },
  {
    id: "C-0991",
    name: "Arvind Swaminathan",
    initials: "AS",
    location: "Atlanta, GA",
    years: 13,
    skills: ["Enterprise Architecture", "AWS", "TOGAF"],
    available: "Now",
    availability: "Now",
    auth: "GC",
    visa: "GC",
    benchAge: 105,
    benchDays: 105,
    benchAgeStr: "105 d",
    consentReq: "1 this week",
    consentSub: "1 consented",
    state: "Interview Set",
    status: "Interview Set",
    type: "External",
    rate: 95,
    role: "Chief Enterprise Architect",
    staleResume: false,
    passedAvail: false,
    noReply: false,
  },
  {
    id: "C-0990",
    name: "Jessica Taylor",
    initials: "JT",
    location: "Tampa, FL",
    years: 6,
    skills: ["Scrum Master", "Agile", "SAFe"],
    available: "Now",
    availability: "Now",
    auth: "USC",
    visa: "USC",
    benchAge: 17,
    benchDays: 17,
    benchAgeStr: "17 d",
    consentReq: "3 this week",
    consentSub: "2 consented",
    state: "Ready to Submit",
    status: "Ready to Submit",
    type: "Internal",
    rate: 71,
    role: "Agile Coach & Scrum Master",
    staleResume: false,
    passedAvail: false,
    noReply: false,
  },
  {
    id: "C-0989",
    name: "Tariq Aziz",
    initials: "TA",
    location: "Columbus, OH",
    years: 8,
    skills: ["Cyber Security", "SIEM", "CISSP"],
    available: "Now",
    availability: "Now",
    auth: "GC",
    visa: "GC",
    benchAge: 58,
    benchDays: 58,
    benchAgeStr: "58 d",
    consentReq: "2 this week",
    consentSub: "1 consented",
    state: "Awaiting Consent",
    status: "Awaiting Consent",
    type: "External",
    rate: 86,
    role: "Security Operations Lead",
    staleResume: false,
    passedAvail: false,
    noReply: false,
  },

  // Page 5 (29–35):
  {
    id: "C-0988",
    name: "Brenda Walker",
    initials: "BW",
    location: "Philadelphia, PA",
    years: 9,
    skills: ["MuleSoft", "Integration", "API"],
    available: "Now",
    availability: "Now",
    auth: "USC",
    visa: "USC",
    benchAge: 21,
    benchDays: 21,
    benchAgeStr: "21 d",
    consentReq: "2 this week",
    consentSub: "1 consented",
    state: "Ready to Submit",
    status: "Ready to Submit",
    type: "Internal",
    rate: 80,
    role: "Senior MuleSoft Architect",
    staleResume: false,
    passedAvail: false,
    noReply: false,
  },
  {
    id: "C-0987",
    name: "Suresh Menon",
    initials: "SM",
    location: "Raleigh, NC",
    years: 7,
    skills: ["Java", "Kafka", "Spring"],
    available: "Now",
    availability: "Now",
    auth: "H-1B",
    visa: "H-1B",
    benchAge: 13,
    benchDays: 13,
    benchAgeStr: "13 d",
    consentReq: "3 this week",
    consentSub: "1 consented",
    state: "Available",
    status: "Available",
    type: "Internal",
    rate: 76,
    role: "Java Backend Engineer",
    staleResume: false,
    passedAvail: false,
    noReply: false,
  },
  {
    id: "C-0986",
    name: "Maya Lin",
    initials: "ML",
    location: "Los Angeles, CA",
    years: 6,
    skills: ["Data Engineering", "Spark", "Scala"],
    available: "Now",
    availability: "Now",
    auth: "USC",
    visa: "USC",
    benchAge: 25,
    benchDays: 25,
    benchAgeStr: "25 d",
    consentReq: "1 this week",
    consentSub: "1 consented",
    state: "Ready to Submit",
    status: "Ready to Submit",
    type: "Internal",
    rate: 81,
    role: "Big Data Engineer",
    staleResume: false,
    passedAvail: false,
    noReply: false,
  },
  {
    id: "C-0985",
    name: "Roberto Santos",
    initials: "RS",
    location: "Miami, FL",
    years: 8,
    skills: ["iOS", "Swift", "SwiftUI"],
    available: "Now",
    availability: "Now",
    auth: "GC",
    visa: "GC",
    benchAge: 27,
    benchDays: 27,
    benchAgeStr: "27 d",
    consentReq: "2 this week",
    consentSub: "1 consented",
    state: "Ready to Submit",
    status: "Ready to Submit",
    type: "Internal",
    rate: 79,
    role: "Mobile App Developer",
    staleResume: false,
    passedAvail: false,
    noReply: false,
  },
  {
    id: "C-0984",
    name: "Kavita Krishnan",
    initials: "KK",
    location: "San Antonio, TX",
    years: 10,
    skills: ["Oracle DBA", "PL/SQL", "RAC"],
    available: "Now",
    availability: "Now",
    auth: "H-1B",
    visa: "H-1B",
    benchAge: 20,
    benchDays: 20,
    benchAgeStr: "20 d",
    consentReq: "1 this week",
    consentSub: "1 consented",
    state: "Ready to Submit",
    status: "Ready to Submit",
    type: "External",
    rate: 77,
    role: "Lead Oracle Database Admin",
    staleResume: false,
    passedAvail: false,
    noReply: false,
  },
  {
    id: "C-0983",
    name: "Ethan Brooks",
    initials: "EB",
    location: "Portland, OR",
    years: 5,
    skills: ["Vue.js", "JavaScript", "Tailwind"],
    available: "Now",
    availability: "Now",
    auth: "USC",
    visa: "USC",
    benchAge: 10,
    benchDays: 10,
    benchAgeStr: "10 d",
    consentReq: "3 this week",
    consentSub: "2 consented",
    state: "Available",
    status: "Available",
    type: "Internal",
    rate: 69,
    role: "Frontend Developer",
    staleResume: false,
    passedAvail: false,
    noReply: false,
  },
  {
    id: "C-0982",
    name: "Deepa Nambiar",
    initials: "DN",
    location: "Chicago, IL",
    years: 8,
    skills: ["GCP", "BigQuery", "Airflow"],
    available: "Now",
    availability: "Now",
    auth: "GC",
    visa: "GC",
    benchAge: 23,
    benchDays: 23,
    benchAgeStr: "23 d",
    consentReq: "2 this week",
    consentSub: "1 consented",
    state: "Ready to Submit",
    status: "Ready to Submit",
    type: "Internal",
    rate: 83,
    role: "Cloud Data Architect",
    staleResume: false,
    passedAvail: false,
    noReply: false,
  },

  // Page 6 (36–42):
  {
    id: "C-0981",
    name: "Alex Novikov",
    initials: "AN",
    location: "Salt Lake City, UT",
    years: 7,
    skills: ["C++", "Linux", "Low Latency"],
    available: "Now",
    availability: "Now",
    auth: "USC",
    visa: "USC",
    benchAge: 18,
    benchDays: 18,
    benchAgeStr: "18 d",
    consentReq: "1 this week",
    consentSub: "1 consented",
    state: "Ready to Submit",
    status: "Ready to Submit",
    type: "Internal",
    rate: 85,
    role: "Systems Programmer",
    staleResume: false,
    passedAvail: false,
    noReply: false,
  },
  {
    id: "C-0980",
    name: "Pooja Hegde",
    initials: "PH",
    location: "Dallas, TX",
    years: 6,
    skills: ["Workday", "HRIS", "Integration"],
    available: "Now",
    availability: "Now",
    auth: "H-1B",
    visa: "H-1B",
    benchAge: 15,
    benchDays: 15,
    benchAgeStr: "15 d",
    consentReq: "2 this week",
    consentSub: "1 consented",
    state: "Available",
    status: "Available",
    type: "External",
    rate: 74,
    role: "Workday Integration Lead",
    staleResume: false,
    passedAvail: false,
    noReply: false,
  },
  {
    id: "C-0979",
    name: "Brian Gallagher",
    initials: "BG",
    location: "Detroit, MI",
    years: 9,
    skills: ["Embedded Systems", "RTOS", "C"],
    available: "Now",
    availability: "Now",
    auth: "USC",
    visa: "USC",
    benchAge: 22,
    benchDays: 22,
    benchAgeStr: "22 d",
    consentReq: "1 this week",
    consentSub: "1 consented",
    state: "Ready to Submit",
    status: "Ready to Submit",
    type: "Internal",
    rate: 82,
    role: "Embedded Firmware Engineer",
    staleResume: true,
    passedAvail: false,
    noReply: false,
  },
  {
    id: "C-0978",
    name: "Swapnil Kothari",
    initials: "SK",
    location: "Remote",
    years: 8,
    skills: ["Android", "Kotlin", "Jetpack"],
    available: "Now",
    availability: "Now",
    auth: "GC",
    visa: "GC",
    benchAge: 14,
    benchDays: 14,
    benchAgeStr: "14 d",
    consentReq: "3 this week",
    consentSub: "1 consented",
    state: "Ready to Submit",
    status: "Ready to Submit",
    type: "External",
    rate: 78,
    role: "Senior Android Developer",
    staleResume: false,
    passedAvail: false,
    noReply: false,
  },
  {
    id: "C-0977",
    name: "Grace Kim",
    initials: "GK",
    location: "San Diego, CA",
    years: 6,
    skills: ["Bio-informatics", "Python", "R"],
    available: "Now",
    availability: "Now",
    auth: "USC",
    visa: "USC",
    benchAge: 19,
    benchDays: 19,
    benchAgeStr: "19 d",
    consentReq: "2 this week",
    consentSub: "1 consented",
    state: "Ready to Submit",
    status: "Ready to Submit",
    type: "Internal",
    rate: 80,
    role: "Computational Biologist",
    staleResume: false,
    passedAvail: false,
    noReply: false,
  },
  {
    id: "C-0976",
    name: "Harish Varma",
    initials: "HV",
    location: "Richmond, VA",
    years: 10,
    skills: ["Mainframe", "COBOL", "DB2"],
    available: "Now",
    availability: "Now",
    auth: "GC",
    visa: "GC",
    benchAge: 21,
    benchDays: 21,
    benchAgeStr: "21 d",
    consentReq: "1 this week",
    consentSub: "1 consented",
    state: "Available",
    status: "Available",
    type: "Internal",
    rate: 73,
    role: "Legacy Systems Specialist",
    staleResume: false,
    passedAvail: false,
    noReply: false,
  },
  {
    id: "C-0975",
    name: "Nicole Perez",
    initials: "NP",
    location: "Orlando, FL",
    years: 5,
    skills: ["Technical Writing", "Docs", "API"],
    available: "Now",
    availability: "Now",
    auth: "USC",
    visa: "USC",
    benchAge: 16,
    benchDays: 16,
    benchAgeStr: "16 d",
    consentReq: "2 this week",
    consentSub: "1 consented",
    state: "Ready to Submit",
    status: "Ready to Submit",
    type: "Internal",
    rate: 65,
    role: "API Technical Writer",
    staleResume: false,
    passedAvail: false,
    noReply: false,
  },

  // Page 7 (43–47):
  {
    id: "C-0974",
    name: "Sandeep Bakshi",
    initials: "SB",
    location: "Indianapolis, IN",
    years: 8,
    skills: ["Pega", "BPM", "PRPC"],
    available: "Now",
    availability: "Now",
    auth: "H-1B",
    visa: "H-1B",
    benchAge: 25,
    benchDays: 25,
    benchAgeStr: "25 d",
    consentReq: "2 this week",
    consentSub: "1 consented",
    state: "Ready to Submit",
    status: "Ready to Submit",
    type: "External",
    rate: 81,
    role: "Lead Pega Developer",
    staleResume: false,
    passedAvail: false,
    noReply: false,
  },
  {
    id: "C-0973",
    name: "Rachel Cohen",
    initials: "RC",
    location: "St. Louis, MO",
    years: 7,
    skills: ["Site Reliability", "Prometheus", "Datadog"],
    available: "Now",
    availability: "Now",
    auth: "USC",
    visa: "USC",
    benchAge: 17,
    benchDays: 17,
    benchAgeStr: "17 d",
    consentReq: "3 this week",
    consentSub: "1 consented",
    state: "Available",
    status: "Available",
    type: "Internal",
    rate: 82,
    role: "SRE Engineer",
    staleResume: false,
    passedAvail: false,
    noReply: false,
  },
  {
    id: "C-0972",
    name: "Manoj Deshmukh",
    initials: "MD",
    location: "Austin, TX",
    years: 9,
    skills: ["Java", "Microservices", "Kubernetes"],
    available: "Now",
    availability: "Now",
    auth: "GC",
    visa: "GC",
    benchAge: 20,
    benchDays: 20,
    benchAgeStr: "20 d",
    consentReq: "2 this week",
    consentSub: "1 consented",
    state: "Ready to Submit",
    status: "Ready to Submit",
    type: "Internal",
    rate: 84,
    role: "Cloud Native Java Lead",
    staleResume: false,
    passedAvail: false,
    noReply: false,
  },
  {
    id: "C-0971",
    name: "Lisa Montgomery",
    initials: "LM",
    location: "Nashville, TN",
    years: 6,
    skills: ["Marketing Ops", "Hubspot", "CRM"],
    available: "Now",
    availability: "Now",
    auth: "USC",
    visa: "USC",
    benchAge: 13,
    benchDays: 13,
    benchAgeStr: "13 d",
    consentReq: "1 this week",
    consentSub: "1 consented",
    state: "Ready to Submit",
    status: "Ready to Submit",
    type: "Internal",
    rate: 67,
    role: "MarTech Specialist",
    staleResume: false,
    passedAvail: false,
    noReply: false,
  },
  {
    id: "C-0970",
    name: "Vivek Choudhury",
    initials: "VC",
    location: "Kansas City, MO",
    years: 8,
    skills: ["Cloud Security", "AWS", "Azure"],
    available: "Now",
    availability: "Now",
    auth: "GC",
    visa: "GC",
    benchAge: 22,
    benchDays: 22,
    benchAgeStr: "22 d",
    consentReq: "2 this week",
    consentSub: "1 consented",
    state: "Ready to Submit",
    status: "Ready to Submit",
    type: "External",
    rate: 86,
    role: "Cloud Security Architect",
    staleResume: false,
    passedAvail: false,
    noReply: false,
  },
];

const submissionsSeed = [
  {id:"SUB-8821",consultant:"Ramesh Kulkarni",  job:"Senior Java Developer",    company:"Zenith Technologies",score:94,status:"Submitted",    submitted:"Today 06:40",   vendor:"Zenith Prime"},
  {id:"SUB-8818",consultant:"Sofia Mendes",      job:"Senior Java Developer",    company:"Zenith Technologies",score:89,status:"Under Review",  submitted:"Today 07:12",   vendor:"Zenith Prime"},
  {id:"SUB-8814",consultant:"Meera Iyer",        job:"Data Engineer",            company:"Apex Partners",      score:91,status:"Interview",     submitted:"Today 05:58",   vendor:"Apex Staffing"},
  {id:"SUB-8807",consultant:"Tobias Lang",       job:".NET Core Developer",      company:"Zenith Technologies",score:88,status:"Submitted",    submitted:"Today 07:31",   vendor:"Zenith Prime"},
  {id:"SUB-8799",consultant:"Nadia Haddad",      job:"QA Automation Engineer",   company:"Apex Partners",      score:93,status:"Rejected",      submitted:"Yesterday 08:02",vendor:"Apex Staffing"},
];

const inboxSeed = [
  {id:1,from:"Zenith Prime Vendor",     subject:"REQ-4482 - Interview request",    preview:"Please confirm availability for the technical round...",      time:"9 min", unread:true, tag:"Interview"},
  {id:2,from:"Apex Staffing",           subject:"Data Engineer - Rate confirmation",preview:"Client has accepted the submitted rate. Please confirm...",    time:"32 min",unread:true, tag:"Rate"},
  {id:3,from:"Zenith Technologies",     subject:"New Java requirement",             preview:"Please find the attached requirement for an immediate joiner...",time:"1 hr",  unread:false,tag:"JD"},
  {id:4,from:"Consultant - Ramesh K",  subject:"RTR signed",                       preview:"Attached is the signed RTR for the Senior Java role.",         time:"2 hr",  unread:false,tag:"RTR"},
];

const nobodySend = [
  {id:1, role:"ServiceNow Admin",      matched:10, bench:47},
  {id:2, role:"Senior Data Scientist", matched:5,  bench:12},
  {id:3, role:"React Developer",       matched:3,  bench:8},
];

const navItems = [
  ["Today",      "/",           Home],
  ["JDs",        "/jds",        FileText,    19],
  ["Bench",      "/bench",      Users,       47],
  ["Consent",    "/consent",    CheckCircle2, 14],
  ["Submissions","/submissions", Send,        5],
];

const getPath = () => window.location.pathname;

function initials(name) {
  if (!name || typeof name !== "string") return "";
  return name.split(" ").filter(Boolean).map(x => (x && x[0] ? x[0].toUpperCase() : "")).slice(0, 2).join("");
}

/* ─── APP ─── */
function App() {
  const [path, setPath]               = useState(getPath() === "/" ? "/" : getPath());
  const [jobs, setJobs]               = useState(jobsSeed);
  const [consultants, setConsultants] = useState(consultantsSeed);
  const [submissions, setSubmissions] = useState(submissionsSeed);
  const [messages, setMessages]       = useState(inboxSeed);
  const [drawer, setDrawer]           = useState(null);
  const [modal,  setModal]            = useState(null);
  const [toast,  setToast]            = useState("");
  const [mobile, setMobile]           = useState(false);

  const navigate = to => {
    setPath(to);
    history.pushState({}, "", to);
    setMobile(false);
    setDrawer(null);
    window.scrollTo(0, 0);
  };

  React.useEffect(() => {
    const f = () => setPath(getPath());
    addEventListener("popstate", f);
    return () => removeEventListener("popstate", f);
  }, []);

  const notify = m => { setToast(m); setTimeout(() => setToast(""), 2500); };

  const addJob = data => {
    setJobs(p => [{ ...data, id: `REQ-${4490 + p.length}` }, ...p]);
    setModal(null); notify("Job added");
  };
  const addConsultant = data => {
    setConsultants(p => [{ ...data, id: `C-${1050 + p.length}` }, ...p]);
    setModal(null); notify("Consultant added to bench");
  };
  const consent = c => {
    setConsultants(p => p.map(x => x.id === c.id ? { ...x, status: "Consent Sent" } : x));
    notify(`Consent sent to ${c.name}`);
  };
  const submit = (c, job = jobs[0]) => {
    setSubmissions(p => [{
      id: `SUB-${8830 + p.length}`, consultant: c.name,
      job: job.title, company: job.company,
      score: 91, status: "Submitted", submitted: "Just now", vendor: job.company
    }, ...p]);
    setConsultants(p => p.map(x => x.id === c.id ? { ...x, status: "Submitted" } : x));
    setDrawer(null); notify(`${c.name} submitted`);
  };

  const isJdDetail = path !== "/jds" && (path.startsWith("/jd/") || path === "/jd");
  const isCoverage = path === "/skills" || path === "/bench/skills" || path === "/bench/coverage";
  const activeJobId = isJdDetail ? path.replace(/^\/jd\/?/, "") : null;
  const selectedJob = jobs.find(j => j.id === activeJobId) || jobs[0];
  const knownRoutes = ["/", "/jds", "/bench", "/skills", "/bench/skills", "/bench/coverage", "/consent", "/submissions", "/inbox"];
  const isValidRoute = knownRoutes.includes(path) || isJdDetail || isCoverage;

  return (
    <div className="app-shell">
      <Sidebar path={path} isCoverage={isCoverage} navigate={navigate} mobile={mobile} close={() => setMobile(false)} />
      <div className="workspace">
        <header className={`topbar ${isJdDetail ? "topbar-jd-detail" : path === "/jds" ? "topbar-jd" : path === "/bench" || path === "/consent" || path === "/submissions" || isCoverage ? "topbar-bench" : ""}`}>
          {isCoverage ? (
            <>
              <button type="button" className="mobile-menu" onClick={() => setMobile(true)}><Menu size={20}/></button>
              <div className="bench-detail-topbar-left">
                <button type="button" className="bench-back-btn" onClick={() => navigate("/bench")}>
                  <ArrowLeft size={16}/> Back to Bench
                </button>
              </div>
              <label className="top-search bench-topbar-search">
                <Search size={15} className="bench-search-icon"/>
                <input placeholder="Search candidates, jobs, skills, or anything..."/>
              </label>
              <div className="top-right bench-topbar-right">
                <button type="button" className="top-icon bench-topbar-bell" onClick={() => notify("No new notifications")}><Bell size={18}/><i/></button>
                <div className="bench-user-container">
                  <div className="profile bench-topbar-profile">
                    <div className="avatar bench-topbar-avatar">P</div>
                    <div className="profile-info bench-topbar-info">
                      <div className="bench-user-name">Priya</div>
                      <div className="bench-user-role">Recruiter</div>
                    </div>
                    <ChevronDown size={14} className="bench-profile-chevron" />
                  </div>
                  <div className="bench-user-date">Tuesday, 23 Sep 2026</div>
                </div>
              </div>
            </>
          ) : isJdDetail ? (
            <>
              <button type="button" className="mobile-menu" onClick={() => setMobile(true)}><Menu size={20}/></button>
              <div className="jd-detail-topbar-left">
                <button type="button" className="jd-back-btn" onClick={() => navigate("/jds")}>
                  <ArrowLeft size={16}/> Back to JDs
                </button>
              </div>
              <label className="top-search jd-detail-topbar-search">
                <Search size={15}/>
                <input placeholder="Search candidates, jobs, or anything..."/>
              </label>
              <div className="top-right jd-detail-topbar-right">
                <button type="button" className="top-icon jd-detail-bell" onClick={() => notify("No new notifications")}><Bell size={18}/><i/></button>
                <div className="profile jd-detail-profile">
                  <div className="avatar jd-detail-avatar">P</div>
                  <div className="profile-info jd-detail-info">
                    <div className="jd-user-name">Priya</div>
                    <div className="jd-user-role">Recruiter</div>
                  </div>
                  <ChevronDown size={14} className="jd-profile-chevron" />
                </div>
              </div>
            </>
          ) : path === "/jds" ? (
            <>
              <button type="button" className="mobile-menu" onClick={() => setMobile(true)}><Menu size={20}/></button>
              <div className="jd-topbar-left">
                <div className="jd-topbar-icon">
                  <FileText size={18} strokeWidth={2.4}/>
                </div>
                <div>
                  <h1 className="jd-topbar-title">JDs</h1>
                  <p className="jd-topbar-subtitle">The register for all job descriptions</p>
                </div>
              </div>
              <label className="top-search jd-topbar-search">
                <Search size={15}/>
                <input placeholder="Search requirements, clients, skills, or anything..."/>
              </label>
              <div className="top-right jd-topbar-right">
                <button type="button" className="top-icon jd-topbar-bell" onClick={() => notify("No new notifications")}><Bell size={18}/><i/></button>
                <div className="profile jd-topbar-profile">
                  <div className="avatar jd-topbar-avatar">P</div>
                  <div className="profile-info jd-topbar-info">
                    <div className="jd-user-name">Priya</div>
                    <div className="jd-user-role">Recruiter</div>
                    <div className="jd-user-date">Tuesday, 23 Sep 2026</div>
                  </div>
                </div>
              </div>
            </>
          ) : path === "/bench" ? (
            <>
              <button type="button" className="mobile-menu" onClick={() => setMobile(true)}><Menu size={20}/></button>
              <div className="bench-topbar-left">
                <div className="bench-topbar-icon">
                  <svg width="28" height="28" viewBox="0 0 24 24" fill="#0d2d59">
                    <path d="M16 11c1.66 0 2.99-1.34 2.99-3S17.66 5 16 5c-1.66 0-3 1.34-3 3s1.34 3 3 3zm-8 0c1.66 0 2.99-1.34 2.99-3S9.66 5 8 5C6.34 5 5 6.34 5 8s1.34 3 3 3zm0 2c-2.33 0-7 1.17-7 3.5V19h14v-2.5c0-2.33-4.67-3.5-7-3.5zm8 0c-.29 0-.62.02-.97.05 1.16.84 1.97 1.97 1.97 3.45V19h6v-2.5c0-2.33-4.67-3.5-7-3.5z"/>
                  </svg>
                </div>
                <div>
                  <h1 className="bench-topbar-title">Bench</h1>
                </div>
              </div>
              <label className="top-search bench-topbar-search">
                <Search size={15} className="bench-search-icon"/>
                <input placeholder="Search candidates, jds, skills, or anything..."/>
              </label>
              <div className="top-right bench-topbar-right">
                <button type="button" className="top-icon bench-topbar-bell" onClick={() => notify("No new notifications")}><Bell size={18}/><i/></button>
                <div className="bench-user-container">
                  <div className="profile bench-topbar-profile">
                    <div className="avatar bench-topbar-avatar">P</div>
                    <div className="profile-info bench-topbar-info">
                      <div className="bench-user-name">Priya</div>
                      <div className="bench-user-role">Recruiter</div>
                    </div>
                    <ChevronDown size={14} className="bench-profile-chevron" />
                  </div>
                  <div className="bench-user-date">Tuesday, 23 Sep 2026</div>
                </div>
              </div>
            </>
          ) : path === "/consent" ? (
            <>
              <button type="button" className="mobile-menu" onClick={() => setMobile(true)}><Menu size={20}/></button>
              <div className="bench-topbar-left">
                <div className="bench-topbar-icon">
                  <Users size={26} strokeWidth={2.2}/>
                </div>
                <div>
                  <h1 className="bench-topbar-title">Consent</h1>
                  <p className="bench-topbar-subtitle">Consultant consent requests and status</p>
                </div>
              </div>
              <label className="top-search bench-topbar-search">
                <Search size={15} className="bench-search-icon"/>
                <input placeholder="Search candidates, jds, skills, or anything..."/>
              </label>
              <div className="top-right bench-topbar-right">
                <button type="button" className="top-icon bench-topbar-bell" onClick={() => notify("No new notifications")}><Bell size={18}/><i/></button>
                <div className="bench-user-container">
                  <div className="profile bench-topbar-profile">
                    <div className="avatar bench-topbar-avatar">P</div>
                    <div className="profile-info bench-topbar-info">
                      <div className="bench-user-name">Priya</div>
                      <div className="bench-user-role">Recruiter</div>
                    </div>
                    <ChevronDown size={14} className="bench-profile-chevron" />
                  </div>
                  <div className="bench-user-date">Tuesday, 23 Sep 2026</div>
                </div>
              </div>
            </>
          ) : path === "/submissions" ? (
            <>
              <button type="button" className="mobile-menu" onClick={() => setMobile(true)}><Menu size={20}/></button>
              <div className="bench-topbar-left">
                <div className="bench-topbar-icon" style={{ color: "#2563eb" }}>
                  <Send size={24} strokeWidth={2.2}/>
                </div>
                <div>
                  <h1 className="bench-topbar-title">Submissions</h1>
                  <p className="bench-topbar-subtitle">Ready to submit and in flight with vendors</p>
                </div>
              </div>
              <label className="top-search bench-topbar-search">
                <Search size={15} className="bench-search-icon"/>
                <input placeholder="Search candidates, jobs, skills, or anything..."/>
              </label>
              <div className="top-right bench-topbar-right">
                <button type="button" className="top-icon bench-topbar-bell" onClick={() => notify("No new notifications")}><Bell size={18}/><i/></button>
                <div className="bench-user-container">
                  <div className="profile bench-topbar-profile">
                    <div className="avatar bench-topbar-avatar">P</div>
                    <div className="profile-info bench-topbar-info">
                      <div className="bench-user-name">Priya</div>
                      <div className="bench-user-role">Recruiter</div>
                    </div>
                    <ChevronDown size={14} className="bench-profile-chevron" />
                  </div>
                  <div className="bench-user-date">Tuesday, 23 Sep 2026</div>
                </div>
              </div>
            </>
          ) : (
            <>
              <button type="button" className="mobile-menu" onClick={() => setMobile(true)}><Menu size={20}/></button>
              <label className="top-search">
                <Search size={14}/>
                <input placeholder="Search candidates, jobs, skills, or anything..."/>
              </label>
              <div className="top-right">
                <button type="button" className="top-icon" onClick={() => notify("No new notifications")}><Bell size={17}/><i/></button>
                <div className="profile">
                  <div className="avatar">P</div>
                  <div className="profile-info">
                    <b>Priya</b>
                    <small>Recruiter</small>
                  </div>
                </div>
                <div className="topbar-date">Tuesday, 23 Sep 2026</div>
              </div>
            </>
          )}
        </header>
        <main className="page">
          {path === "/"            && <Dashboard navigate={navigate} jobs={jobs} consultants={consultants} setDrawer={setDrawer}/>}
          {path === "/jds"         && <Jobs jobs={jobs} setModal={setModal} setDrawer={setDrawer} notify={notify} navigate={navigate}/>}
          {isJdDetail              && <JobDetail job={selectedJob} jobs={jobs} consultants={consultants} navigate={navigate} setDrawer={setDrawer} notify={notify}/>}
          {(path === "/bench" && !isCoverage) && <Bench consultants={consultants} setModal={setModal} setDrawer={setDrawer} drawer={drawer} consent={consent} navigate={navigate}/>}
          {isCoverage              && <Skills consultants={consultants} navigate={navigate}/>}
          {path === "/consent"     && <Consent consultants={consultants} notify={notify} setDrawer={setDrawer}/>}
          {path === "/submissions" && <Submissions data={submissions} consultants={consultants} notify={notify} setDrawer={setDrawer}/>}
          {path === "/inbox"       && <InboxPage messages={messages} setMessages={setMessages} setDrawer={setDrawer} setModal={setModal}/>}
          {!isValidRoute           && <Dashboard navigate={navigate} jobs={jobs} consultants={consultants} setDrawer={setDrawer}/>}
        </main>
      </div>

      {/* Drawers */}
      {drawer?.type === "consultant" && <ConsultantDrawer item={drawer.item} close={() => setDrawer(null)} consent={consent} submit={submit} notify={notify}/>}
      {drawer?.type === "job"        && <JobDrawer        item={drawer.item} close={() => setDrawer(null)} navigate={navigate}/>}
      {drawer?.type === "message"    && <MessageDrawer    item={drawer.item} close={() => setDrawer(null)} notify={notify}/>}

      {/* Modals */}
      {modal === "job"        && <JobModal        close={() => setModal(null)} save={addJob}/>}
      {modal === "consultant" && <ConsultantModal close={() => setModal(null)} save={addConsultant}/>}
      {modal === "compose"    && <ComposeModal    close={() => setModal(null)} notify={notify}/>}

      {toast && <div className="toast"><Check size={15}/>{toast}</div>}
    </div>
  );
}

/* ─── SIDEBAR ─── */
function Sidebar({ path, isCoverage, navigate, mobile, close }) {
  return (
    <>
      <div className={`sidebar-overlay ${mobile ? "show" : ""}`} onClick={close}/>
      <aside className={`sidebar ${mobile ? "show" : ""}`}>
        <div className="brand">
          <strong>TEKISHO</strong>
          <span>Bench Sales</span>
        </div>
        <nav>
          {navItems.map(([name, to, Icon, badge]) => (
            <button
              key={to}
              type="button"
              className={path === to || (to === "/jds" && (path === "/jds" || path.startsWith("/jd/") || path === "/jd")) || (to === "/bench" && (path === "/bench" || isCoverage)) ? "active" : ""}
              onClick={() => navigate(to)}
            >
              <Icon size={18} strokeWidth={path === to || (to === "/jds" && (path === "/jds" || path.startsWith("/jd/") || path === "/jd")) || (to === "/bench" && (path === "/bench" || isCoverage)) ? 2.2 : 1.8}/>
              <span>{name}</span>
              {badge && <em>{badge}</em>}
            </button>
          ))}
        </nav>
        <div className="sidebar-bottom">
          <div className="people-tagline">
            <b>People</b>
            <small>Process Smarter</small>
          </div>
        </div>
      </aside>
    </>
  );
}

/* ─── DASHBOARD ─── */
function Dashboard({ navigate, jobs, consultants, setDrawer }) {
  const ready = consultants.filter(c => c.status === "Ready to Submit");

  return (
    <>
      {/* Greeting */}
      <div className="greeting">
        <h1>Good Morning, Priya</h1>
        <p>Let's make it a productive day!</p>
      </div>

      {/* Stat Cards */}
      <div className="stats">
        <StatCard icon={FileText}    label="JDs Received"    value="7"            sub="in the last 24 hours"        onClick={() => navigate("/jds")}/>
        <StatCard icon={Users}       label="Shortlisted"     value="22"           sub="AI matched candidates"       onClick={() => navigate("/jds")}/>
        <StatCard icon={ShieldCheck} label="Consent"         value="14"           sub="pending / resolved"          onClick={() => navigate("/consent")}/>
        <StatCard icon={Send}        label="Ready to Submit" value={ready.length} sub="candidates with consent"     onClick={() => navigate("/submissions")}/>
        <StatCard icon={CircleAlert} label="Nobody to Send"  value="3"            sub="open roles with no-matches"  onClick={() => navigate("/jds")}/>
      </div>

      {/* Ready to Submit Strip */}
      <div className="section-header">
        <div>
          <div className="section-title">
            <div className="section-icon"><Users size={15}/></div>
            <h2>Ready to Submit</h2>
          </div>
          <p className="section-desc">5 candidates have given consent. Your only decision today.</p>
        </div>
        <button type="button" className="view-link" onClick={() => navigate("/submissions")}>
          View all <ArrowRight size={13}/>
        </button>
      </div>

      <div className="ready-strip">
        {ready.slice(0, 5).map(c => (
          <div className="ready-card" key={c.id}>
            <div className="ready-initials">{c.initials || initials(c.name)}</div>
            <div className="ready-name">{c.name}</div>
            <div className="ready-role">{c.role}</div>
            <button type="button" className="ready-review" onClick={() => setDrawer({ type: "consultant", item: c })}>
              Review <ArrowRight size={12}/>
            </button>
          </div>
        ))}
      </div>

      {/* Bottom Grid */}
      <div className="dashboard-bottom">
        {/* JDs Received Table */}
        <div className="panel">
          <div className="panel-head">
            <div className="panel-head-left">
              <div className="panel-icon"><FileText size={14}/></div>
              <div>
                <h2>JDs Received in the Last 24 Hours</h2>
                <p>7 new job descriptions parsed and processed</p>
              </div>
            </div>
            <button type="button" className="view-link" onClick={() => navigate("/jds")}>
              View all JDs <ArrowRight size={13}/>
            </button>
          </div>
          <table className="jd-table">
            <thead>
              <tr>
                <th style={{width:24}}>#</th>
                <th>Job Title</th>
                <th>Company</th>
                <th>Skills</th>
                <th>Location</th>
                <th>Posted</th>
              </tr>
            </thead>
            <tbody>
              {jobs.slice(0, 7).map((j, i) => (
                <tr key={j.id} style={{ cursor: "pointer" }} onClick={() => setDrawer({ type: "job", item: j })}>
                  <td><span className="jd-num">—</span></td>
                  <td>
                    <span className="jd-title-link">{j.title}</span>
                    <span className="jd-company">{j.company}</span>
                  </td>
                  <td>{j.company}</td>
                  <td>
                    <div className="jd-skills">
                      {j.skills.slice(0, 3).map(s => (
                        <span key={s} className="jd-skill-tag">{s}</span>
                      ))}
                    </div>
                  </td>
                  <td><span className="jd-location">{j.location}</span></td>
                  <td><span className="jd-posted">—</span></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Nobody to Send */}
        <div className="panel nobody-panel">
          <div className="panel-head">
            <div className="panel-head-left">
              <div className="panel-icon"><Users size={14}/></div>
              <h2>Nobody to Send ({nobodySend.length})</h2>
            </div>
            <button type="button" className="view-link" onClick={() => navigate("/jds")}>
              View all <ArrowRight size={13}/>
            </button>
          </div>
          <div className="nobody-list">
            {nobodySend.map(item => (
              <div className="nobody-item" key={item.id} onClick={() => navigate("/jds")}>
                <div className="nobody-role">{item.role}</div>
                <div className="nobody-right">
                  <div className="nobody-count-wrap">
                    <div className="nobody-fraction">
                      <span className="nobody-matched">{item.matched}</span>
                      <span className="nobody-sep"> / </span>
                      <span className="nobody-bench">{item.bench}</span>
                    </div>
                    <div className="nobody-label">temp matched</div>
                  </div>
                  <DonutRing matched={item.matched} bench={item.bench}/>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

/* ─── DONUT RING ─── */
function DonutRing({ matched, bench }) {
  const size   = 44;
  const stroke = 4;
  const r      = (size - stroke) / 2;
  const circ   = 2 * Math.PI * r;
  const pct    = bench > 0 ? matched / bench : 0;
  // Only show filled arc if matched > 0
  const filled = matched > 0 ? Math.max(pct * circ, 4) : 0;
  const gap    = circ - filled;
  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} style={{flex:'none'}}>
      {/* grey background track */}
      <circle
        cx={size/2} cy={size/2} r={r}
        fill="none"
        stroke="#dde8f0"
        strokeWidth={stroke}
      />
      {/* filled arc — only rendered when matched > 0 */}
      {filled > 0 && (
        <circle
          cx={size/2} cy={size/2} r={r}
          fill="none"
          stroke="#1a4a7a"
          strokeWidth={stroke}
          strokeDasharray={`${filled} ${gap}`}
          strokeLinecap="round"
          transform={`rotate(-90 ${size/2} ${size/2})`}
        />
      )}
    </svg>
  );
}

/* ─── STAT CARD ─── */
function StatCard({ icon: Icon, label, value, sub, onClick }) {
  return (
    <button type="button" className="stat" onClick={onClick}>
      <div className="stat-icon-wrap">
        <Icon size={18}/>
      </div>
      <div className="stat-body">
        <div className="stat-label">{label}</div>
        <div className="stat-value-row">
          <div className="stat-value">{value}</div>
          <div className="stat-arrow"><ArrowRight size={14}/></div>
        </div>
        <div className="stat-sub">{sub}</div>
      </div>
    </button>
  );
}

/* ─── HEADER (other pages) ─── */
function Header({ title, description, actions }) {
  return (
    <div className="page-header">
      <div>
        <div className="eyebrow">BENCH SALES</div>
        <h1>{title}</h1>
        {description && <p>{description}</p>}
      </div>
      <div className="actions">{actions}</div>
    </div>
  );
}

/* ─── STATUS ─── */
function Status({ text }) {
  const tone = /ready|submitted|interview|consent in/i.test(text) ? "success"
             : /awaiting|sent|review/i.test(text)                  ? "warning"
             : /rejected|held|no match/i.test(text)               ? "danger"
             : "neutral";
  return <span className={`status ${tone}`}><i/>{text}</span>;
}

/* ─── PANEL HEAD ─── */
function PanelHead({ icon: Icon, title, action }) {
  return (
    <div className="panel-head">
      <div className="panel-head-left">
        <div className="panel-icon"><Icon size={14}/></div>
        <h2>{title}</h2>
      </div>
      {action}
    </div>
  );
}

/* ─── PIPE (pipeline bar) ─── */
function Pipe({ label, value, h }) {
  return (
    <div className="pipe">
      <strong>{value}</strong>
      <i style={{ height: h }}/>
      <span>{label}</span>
    </div>
  );
}

/* ─── JOB LIST PAGE ─── */
function Jobs({ jobs, setModal, setDrawer, notify, navigate }) {
  const [activeFilter, setActiveFilter] = useState("Ready to Submit");
  const [page, setPage] = useState(1);
  const PER_PAGE = 8;

  const filterCounts = {
    "Ready to Submit":      5,
    "Awaiting Consent":     14,
    "Held Below the Floor": 1,
    "No Match on Bench":    3,
  };

  const filterMap = {
    "All States":          () => true,
    "Ready to Submit":     () => true, // Selected default tab in screenshot mockup showing register overview
    "Awaiting Consent":    j => j.state === "Consent In" || j.state === "Consent Sent",
    "Held Below the Floor":j => j.state === "Held Below Floor",
    "No Match on Bench":   j => j.state === "No Match on Bench",
  };

  const filtered = jobs.filter(filterMap[activeFilter] || (() => true));
  const totalPages = Math.ceil(filtered.length / PER_PAGE) || 1;
  const paged = filtered.slice((page - 1) * PER_PAGE, page * PER_PAGE);

  return (
    <div className="jd-page-content">
      {/* Top Action Row: + Add JD */}
      <div className="jd-top-actions">
        <button type="button" className="jd-add-btn" onClick={() => setModal("job")}>
          <Plus size={15} strokeWidth={2.4}/> Add JD
        </button>
      </div>

      {/* Filter Tabs Bar */}
      <div className="jd-filters-bar">
        <div className="jd-filter-left">
          <span className="jd-filters-label">FILTERS</span>
          <div className="jd-filter-tabs">
            {Object.keys(filterMap).map(key => (
              <button
                type="button"
                key={key}
                className={`jd-filter-tab ${activeFilter === key ? "active" : ""}`}
                onClick={() => { setActiveFilter(key); setPage(1); }}
              >
                {key}{filterCounts[key] != null ? ` (${filterCounts[key]})` : ""}
              </button>
            ))}
          </div>
        </div>
        <button type="button" className="jd-time-filter" onClick={e => e.preventDefault()}>
          <CalendarDays size={13}/> Last 24 hours <ChevronDown size={12}/>
        </button>
      </div>

      {/* JD Register Subheader */}
      <div className="jd-register-header">
        <div>
          <h2 className="jd-register-title">JD Register</h2>
          <p className="jd-register-meta">19 open · 1 held for missing fields · 3 with nobody on the bench to send</p>
        </div>
        <div className="jd-register-actions">
          <button type="button" className="jd-action-btn" onClick={() => notify?.("Exporting JDs...")}><Download size={13}/> Export</button>
          <button type="button" className="jd-action-btn jd-action-icon" onClick={e => e.preventDefault()}><LayoutGrid size={14}/></button>
        </div>
      </div>

      {/* Table */}
      <div className="jd-table-wrap">
        <table className="jd-reg-table">
          <thead>
            <tr>
              <th style={{width: 32}}>#</th>
              <th>Job Title</th>
              <th>Company</th>
              <th>Source</th>
              <th>JD Quality</th>
              <th>Bench → Shortlist</th>
              <th>Consent</th>
              <th>State</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {paged.map((j, i) => (
              <tr
                key={j.id}
                className="jd-table-row clickable"
                onClick={() => navigate(`/jd/${j.id}`)}
              >
                <td className="jd-num-cell">{(page - 1) * PER_PAGE + i + 1}</td>
                <td>
                  <div className="jd-title-btn">
                    <span className="jd-reg-title">{j.title}</span>
                    <span className="jd-reg-company">{j.company}</span>
                  </div>
                </td>
                <td className="jd-loc-cell">{j.location}</td>
                <td>
                  <span className="jd-source">{j.source}</span>
                  <span className="jd-posted">{j.posted}</span>
                </td>
                <td className="jd-quality-cell">{j.quality?.toFixed(2) ?? "—"}</td>
                <td className="jd-bench-cell">{j.benchShortlist || "—"}</td>
                <td className="jd-consent-cell">{j.consent || "—"}</td>
                <td>
                  <span className="state-pill pill-consent-in">{j.state}</span>
                </td>
                <td>
                  <div className="jd-actions-cell" onClick={e => e.stopPropagation()}>
                    <button type="button" className="jd-view-btn" onClick={() => navigate(`/jd/${j.id}`)}>
                      View →
                    </button>
                    <button type="button" className="jd-more-dots-btn" aria-label="More options" onClick={() => notify?.(`Options for ${j.id}`)}>
                      <MoreVertical size={16}/>
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Footer / Pagination */}
      <div className="jd-table-footer">
        <span className="jd-showing">Showing {(page-1)*PER_PAGE+1}–{Math.min(page*PER_PAGE, filtered.length)} of {filtered.length} JDs</span>
        <div className="jd-pagination">
          <button type="button" className="jd-pg-btn" disabled={page === 1} onClick={() => setPage(p => Math.max(1, p - 1))}>
            <ChevronLeft size={13}/>
          </button>
          {Array.from({length: totalPages}, (_, i) => (
            <button
              type="button"
              key={i+1}
              className={`jd-pg-btn ${page === i+1 ? "active" : ""}`}
              onClick={() => setPage(i+1)}
            >{i+1}</button>
          ))}
          <button type="button" className="jd-pg-btn" disabled={page === totalPages} onClick={() => setPage(p => Math.min(totalPages, p + 1))}>
            <ChevronRight size={13}/>
          </button>
        </div>
      </div>
    </div>
  );
}

/* ─── SHORTLISTED CANDIDATES SEED DATA (100% REPLICA) ─── */
const shortlistedCandidatesSeed = [
  {
    name: "Ramesh Kulkarni",
    match: "0.94",
    line1: "consented 06:40 · 8 of 9 skills ·",
    line2: "interviewed 3 Sep",
    status: "WORTH SENDING",
    notes: "—",
    action: "Review →",
    actionType: "primary"
  },
  {
    name: "Sofia Mendes",
    match: "0.89",
    line1: "consented 07:12 · 7 of 9 skills ·",
    line2: "interviewed 28 Aug",
    status: "WORTH SENDING",
    notes: "—",
    action: "Review →",
    actionType: "primary"
  },
  {
    name: "Vikram Rao",
    match: "0.88",
    line1: "declined 05:02 · stays on the",
    line2: "bench for every other JD",
    status: "WORTH SENDING",
    notes: "—",
    action: "Review →",
    actionType: "primary"
  },
  {
    name: "Ajay Verma",
    match: "0.86",
    line1: "sent 02:34 · Kafka now",
    line2: "evidenced on a project",
    status: "NOT SURE YET",
    notes: "—",
    action: "Request mock →",
    actionType: "secondary"
  },
  {
    name: "Priya Nair",
    match: "0.85",
    line1: "sent 02:28 · available 29 Sep ·",
    line2: "wants 2 weeks",
    status: "NOT SURE YET",
    notes: "—",
    action: "Request mock →",
    actionType: "secondary"
  },
  {
    name: "Arjun Das",
    match: "0.85",
    line1: "reminded in 2 h · two skills",
    line2: "claimed on profile only",
    status: "NOT SURE YET",
    notes: "—",
    action: "Request mock →",
    actionType: "secondary"
  }
];

/* ─── JOB DETAIL (100% EXACT REPLICA) ─── */
function JobDetail({ job = jobsSeed[0], consultants, navigate, setDrawer, notify }) {
  const currentJob = job || jobsSeed[0] || {};
  const isTargetJob = !currentJob || currentJob.id === "REQ-4482";
  const skillsDisplay = isTargetJob
    ? "Java 8+, Spring Boot, Kafka, AWS, PostgreSQL"
    : (Array.isArray(currentJob.skills) ? currentJob.skills.join(", ") : "Java 8+, Spring Boot, Kafka, AWS, PostgreSQL");

  return (
    <div className="jd-detail-page">
      {/* Header Section */}
      <div className="jd-detail-header">
        <div className="jd-detail-header-left">
          <div className="jd-header-icon-box">
            <FileText size={24} strokeWidth={2.3} />
          </div>
          <div className="jd-header-titles">
            <h1 className="jd-header-title">{currentJob.title || "Senior Java Developer"} — {currentJob.location || "Charlotte, NC"}</h1>
            <p className="jd-header-meta">
              <span>{currentJob.company || "Zenith Technologies"}</span>
              <span className="meta-dot">·</span>
              <span>JD ID: {currentJob.id || "REQ-4482"}</span>
              <span className="meta-dot">·</span>
              <span>Received {currentJob.posted || "14 min ago"}</span>
            </p>
          </div>
        </div>
        <div className="jd-detail-header-right">
          <div className="jd-header-date">Tuesday, 23 Sep 2026</div>
          <div className="jd-header-badges-row">
            <span className="jd-badge-pill active">Active</span>
            <span className="jd-badge-pill ready">Ready to Submit</span>
            <button type="button" className="jd-actions-dropdown-btn" onClick={() => notify?.("Actions clicked")}>
              Actions <ChevronDown size={14} />
            </button>
          </div>
        </div>
      </div>

      {/* Main 2-Column Grid */}
      <div className="jd-detail-grid">
        {/* Left Column: JD Details Card */}
        <div className="jd-card jd-spec-card">
          <div className="jd-card-head">
            <div>
              <h2 className="jd-card-title">JD Details</h2>
              <p className="jd-card-subtitle">What it read, and filtered on</p>
            </div>
            <span className="jd-auto-parsed-badge">Auto Parsed</span>
          </div>

          <div className="jd-spec-list">
            {/* 1. SUMMARY */}
            <div className="jd-spec-row">
              <div className="jd-spec-icon"><FileText size={17} strokeWidth={2}/></div>
              <div className="jd-spec-body">
                <span className="jd-spec-label">SUMMARY</span>
                <p className="jd-spec-val">
                  Nobody approved this summary. Every condition below was applied to the whole bench with no human in the path.
                </p>
              </div>
            </div>

            {/* 2. SKILLS */}
            <div className="jd-spec-row">
              <div className="jd-spec-icon"><Code2 size={17} strokeWidth={2}/></div>
              <div className="jd-spec-body">
                <span className="jd-spec-label">SKILLS</span>
                <p className="jd-spec-val">{skillsDisplay}</p>
                <span className="jd-spec-sub">from JD text · 2 normalised</span>
              </div>
            </div>

            {/* 3. EXPERIENCE */}
            <div className="jd-spec-row">
              <div className="jd-spec-icon"><Briefcase size={17} strokeWidth={2}/></div>
              <div className="jd-spec-body">
                <span className="jd-spec-label">EXPERIENCE</span>
                <p className="jd-spec-val">{isTargetJob ? "8+ years" : (currentJob.exp || "8+ years")}</p>
                <span className="jd-spec-sub">from JD text</span>
              </div>
            </div>

            {/* 4. LOCATION */}
            <div className="jd-spec-row">
              <div className="jd-spec-icon"><MapPin size={17} strokeWidth={2}/></div>
              <div className="jd-spec-body">
                <span className="jd-spec-label">LOCATION</span>
                <p className="jd-spec-val">
                  {currentJob.location || "Charlotte, NC"} — {currentJob.mode === "Hybrid" ? "hybrid 3 days" : (currentJob.mode || "hybrid 3 days")}
                </p>
                <span className="jd-spec-sub">from JD text</span>
              </div>
            </div>

            {/* 5. AUTHORIZATION */}
            <div className="jd-spec-row">
              <div className="jd-spec-icon">
                <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="2" y="4" width="20" height="16" rx="3"/>
                  <circle cx="8" cy="11" r="2.5"/>
                  <path d="M5 17c0-1.5 1.5-2.5 3-2.5s3 1 3 2.5"/>
                  <line x1="14" y1="9" x2="19" y2="9"/>
                  <line x1="14" y1="13" x2="19" y2="13"/>
                </svg>
              </div>
              <div className="jd-spec-body">
                <span className="jd-spec-label">AUTHORIZATION</span>
                <p className="jd-spec-val">USC or Green Card only</p>
                <span className="jd-spec-sub">from JD text</span>
              </div>
            </div>

            {/* 6. AVAILABILITY */}
            <div className="jd-spec-row">
              <div className="jd-spec-icon"><Clock size={17} strokeWidth={2}/></div>
              <div className="jd-spec-body">
                <span className="jd-spec-label">AVAILABILITY</span>
                <p className="jd-spec-val">Within 2 weeks</p>
                <span className="jd-spec-sub">inferred from "ASAP" — not literal</span>
              </div>
            </div>

            {/* 7. BILL RATE */}
            <div className="jd-spec-row">
              <div className="jd-spec-icon"><Coins size={17} strokeWidth={2}/></div>
              <div className="jd-spec-body">
                <span className="jd-spec-label">BILL RATE</span>
                <p className="jd-spec-val">Not stated in the JD</p>
                <span className="jd-spec-sub">condition not applied — flagged on submission</span>
              </div>
            </div>

            {/* 8. HOW 47 BECAME 6 */}
            <div className="jd-spec-row last">
              <div className="jd-spec-icon"><BarChart3 size={17} strokeWidth={2}/></div>
              <div className="jd-spec-body">
                <span className="jd-spec-label">HOW  47  BECAME  6</span>
                <p className="jd-spec-val">
                  47 on bench → hard conditions -33 → match floor 0.85 -8 → 6 consent requests sent
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Shortlisted Candidates Card */}
        <div className="jd-card jd-candidates-card">
          <div className="jd-card-head">
            <div>
              <h2 className="jd-card-title">Shortlisted Candidates</h2>
              <p className="jd-card-subtitle">How sure we are, and where they stand</p>
            </div>
            <span className="jd-shortlist-stats-badge">3 Worth Sending · 3 Not Sure Yet</span>
          </div>

          {/* Candidates Grid Table */}
          <div className="jd-cand-grid-table">
            <div className="jd-cand-grid-header">
              <div className="c-col-match">Match</div>
              <div className="c-col-cand">Candidate</div>
              <div className="c-col-status">Status</div>
              <div className="c-col-notes">Notes</div>
              <div className="c-col-action">Action</div>
            </div>

            <div className="jd-cand-list">
              {shortlistedCandidatesSeed.map((c, idx) => (
                <div key={idx} className="jd-cand-grid-row">
                  <div className="c-col-match">
                    <span className="cand-score-bar"/>
                    <span className="cand-score-num">{c.match}</span>
                  </div>
                  <div className="c-col-cand">
                    <div className="cand-full-name">{c.name}</div>
                    <div className="cand-sub-details">
                      <div>{c.line1}</div>
                      <div>{c.line2}</div>
                    </div>
                  </div>
                  <div className="c-col-status">
                    <span className="cand-status-pill">{c.status}</span>
                  </div>
                  <div className="c-col-notes">—</div>
                  <div className="c-col-action">
                    {c.actionType === "primary" ? (
                      <button
                        type="button"
                        className="cand-btn-primary"
                        onClick={() => {
                          const matched = (consultants || []).find(co => co.name.toLowerCase().includes(c.name.split(" ")[0].toLowerCase()));
                          if (matched) setDrawer({ type: "consultant", item: matched });
                          else notify?.(`Reviewing ${c.name}`);
                        }}
                      >
                        Review →
                      </button>
                    ) : (
                      <button
                        type="button"
                        className="cand-btn-secondary"
                        onClick={() => notify?.(`Mock interview requested for ${c.name}`)}
                      >
                        Request mock →
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Info Box Callout */}
          <div className="jd-cand-info-callout">
            <div className="jd-cand-info-icon">
              <InfoIcon size={14} strokeWidth={2.5}/>
            </div>
            <div className="jd-cand-info-text">
              <p className="jd-cand-info-main">
                The band says how sure we are for this JD; it gates nothing. A recruiter may submit a NOT SURE YET and pass on a WORTH SENDING, and the reason is recorded.
              </p>
              <p className="jd-cand-info-sub">
                Where we are not sure the row offers a way to find out rather than a shrug — slide 5 follows Ajay through it.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ─── BENCH ─── */
function Bench({ consultants, setModal, setDrawer, drawer, consent, navigate }) {
  const [selectedIds, setSelectedIds]   = useState(() => new Set());
  const [activeTab, setActiveTab]       = useState("Over 30 days (11)");
  const [availFilter, setAvailFilter]   = useState("All");
  const [skillFilter, setSkillFilter]   = useState("Any");
  const [skillOpen, setSkillOpen]       = useState(false);
  const [currentPage, setCurrentPage]   = useState(1);
  const itemsPerPage = 7;

  // Filter logic:
  // In the reference mockup, "Over 30 days (11)" tab is active, but the full 47 consultants inventory is displayed.
  // When user switches to other specific pills, we dynamically filter so the tab interaction is fully alive.
  const filtered = consultants.filter(c => {
    if (availFilter !== "All") {
      if (c.available !== availFilter && c.availability !== availFilter) return false;
    }
    if (skillFilter !== "Any") {
      if (!c.skills.some(s => s.toLowerCase().includes(skillFilter.toLowerCase()))) return false;
    }
    if (activeTab === "Stale resume (4)") {
      return !!c.staleResume;
    }
    if (activeTab === "Availability date passed (3)") {
      return !!c.passedAvail;
    }
    if (activeTab === "No consent reply (2)") {
      return !!c.noReply;
    }
    // "Over 30 days (11)" or "All": show the complete inventory (47 consultants)
    return true;
  });

  const totalFiltered = filtered.length;
  const totalPages = Math.ceil(totalFiltered / itemsPerPage) || 1;
  const validPage = Math.min(currentPage, totalPages);
  const startIdx = (validPage - 1) * itemsPerPage;
  const pageItems = filtered.slice(startIdx, startIdx + itemsPerPage);

  const isAllSelected = pageItems.length > 0 && pageItems.every(c => selectedIds.has(c.id));

  const toggleSelectAll = () => {
    const next = new Set(selectedIds);
    if (isAllSelected) {
      pageItems.forEach(c => next.delete(c.id));
    } else {
      pageItems.forEach(c => next.add(c.id));
    }
    setSelectedIds(next);
  };

  const toggleSelectOne = id => {
    const next = new Set(selectedIds);
    if (next.has(id)) next.delete(id);
    else next.add(id);
    setSelectedIds(next);
  };

  const handleTabClick = tabName => {
    if (activeTab === tabName) {
      // Toggle off to show full bench
      setActiveTab("All");
    } else {
      setActiveTab(tabName);
    }
    setCurrentPage(1);
  };

  return (
    <div className="bench-page-content">
      {/* Top Action Buttons (aligned to right) */}
      <div className="bench-top-actions">
        <button
          type="button"
          className="bench-btn-coverage"
          onClick={() => navigate ? navigate("/skills") : null}
        >
          <svg width="15" height="15" viewBox="0 0 16 16" fill="currentColor">
            <rect x="1" y="9" width="3.2" height="7" rx="0.5"/>
            <rect x="6.4" y="5" width="3.2" height="11" rx="0.5"/>
            <rect x="11.8" y="1" width="3.2" height="15" rx="0.5"/>
          </svg>
          <span>Skill coverage</span>
        </button>
        <button
          type="button"
          className="bench-btn-add"
          onClick={() => setModal("consultant")}
        >
          <Plus size={15} strokeWidth={2.5}/>
          <span>Add Consultant</span>
        </button>
      </div>

      {/* Filters Box */}
      <div className="bench-filters-box">
        <div className="bench-filters-label">FILTERS</div>
        <div className="bench-filters-row">
          {/* ALL Button */}
          <button
            type="button"
            className={`bench-filter-pill ${activeTab === "All" ? "active" : ""}`}
            onClick={() => {
              setActiveTab("All");
              setAvailFilter("All");
              setCurrentPage(1);
            }}
          >
            ALL
          </button>

          {/* Skills Dropdown */}
          <div className="bench-dropdown-container">
            <button
              className="bench-dropdown-pill"
              onClick={() => setSkillOpen(v => !v)}
              type="button"
            >
              <span>Skills: {skillFilter}</span>
              <ChevronDown size={13}/>
            </button>
            {skillOpen && (
              <div className="bench-dropdown-menu">
                {["Any", "Java", "Python", "ServiceNow", "Selenium", "Snowflake", "AWS", ".NET"].map(opt => (
                  <div
                    key={opt}
                    className={`bench-dropdown-item ${skillFilter === opt ? "active" : ""}`}
                    onClick={() => { setSkillFilter(opt); setSkillOpen(false); setCurrentPage(1); }}
                  >
                    {opt}
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Filter Pills */}
          <button
            type="button"
            className={`bench-filter-pill ${activeTab === "Over 30 days (11)" ? "active" : ""}`}
            onClick={() => handleTabClick("Over 30 days (11)")}
          >
            Over 30 days (11)
          </button>
          <button
            type="button"
            className={`bench-filter-pill ${activeTab === "Stale resume (4)" ? "active" : ""}`}
            onClick={() => handleTabClick("Stale resume (4)")}
          >
            Stale resume (4)
          </button>
          <button
            type="button"
            className={`bench-filter-pill ${activeTab === "Availability date passed (3)" ? "active" : ""}`}
            onClick={() => handleTabClick("Availability date passed (3)")}
          >
            Availability date passed (3)
          </button>
          <button
            type="button"
            className={`bench-filter-pill ${activeTab === "No consent reply (2)" ? "active" : ""}`}
            onClick={() => handleTabClick("No consent reply (2)")}
          >
            No consent reply (2)
          </button>
        </div>
      </div>

      {/* Consultant Inventory Card */}
      <div className="bench-card">
        <div className="bench-card-header">
          <div className="bench-card-header-left">
            <h2 className="bench-card-title">Consultant Inventory</h2>
          </div>
          <div className="bench-shortlist-badge">
            SHORTLISTED AUTOMATICALLY AGAINST EVERY NEW JD
          </div>
        </div>

        <div className="bench-table-wrap">
          <table className="bench-table">
            <thead>
              <tr>
                <th style={{ width: 44, paddingLeft: 20 }}>
                  <input
                    type="checkbox"
                    className="bench-checkbox"
                    checked={isAllSelected}
                    onChange={toggleSelectAll}
                  />
                </th>
                <th>Consultant</th>
                <th>Primary Skills</th>
                <th>Available</th>
                <th>Auth</th>
                <th>Bench Age</th>
                <th>Consent Requests</th>
                <th>State</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {pageItems.map(c => {
                const isSelected = drawer?.type === "consultant" && drawer?.item?.id === c.id;
                return (
                  <tr
                    key={c.id}
                    className={`bench-tr ${isSelected ? "selected-row" : ""}`}
                    onClick={() => setDrawer({ type: "consultant", item: c })}
                  >
                  <td style={{ paddingLeft: 20 }} onClick={e => e.stopPropagation()}>
                    <input
                      type="checkbox"
                      className="bench-checkbox"
                      checked={selectedIds.has(c.id)}
                      onChange={() => toggleSelectOne(c.id)}
                    />
                  </td>
                  <td>
                    <div className="bench-consultant-cell">
                      <span className="bench-name">{c.name}</span>
                      <span className="bench-meta">{c.location} • {c.years} yrs</span>
                    </div>
                  </td>
                  <td>
                    <span className="bench-skills">{c.skills.slice(0, 3).join(", ")}</span>
                  </td>
                  <td>
                    {c.available === "15 Sep" ? (
                      <span className="bench-available-pill">{c.available}</span>
                    ) : (
                      <span className="bench-available">{c.available || c.availability}</span>
                    )}
                  </td>
                  <td>
                    <span className="bench-auth-pill">{c.auth || c.visa}</span>
                  </td>
                  <td>
                    <span className="bench-age">{c.benchAgeStr || `${c.benchAge} d`}</span>
                  </td>
                  <td>
                    <div className="bench-consent-cell">
                      <span className="bench-consent-line1">{c.consentReq}</span>
                      <span className="bench-consent-line2">{c.consentSub}</span>
                    </div>
                  </td>
                  <td>
                    <span className="bench-state-pill">{c.state || c.status}</span>
                  </td>
                  <td>
                    <div className="bench-action-cell">
                      <button
                        type="button"
                        className="bench-view-btn"
                        onClick={e => {
                          e.stopPropagation();
                          setDrawer({ type: "consultant", item: c });
                        }}
                      >
                        View →
                      </button>
                      <button
                        type="button"
                        className="bench-dots-btn"
                        onClick={e => {
                          e.stopPropagation();
                          setDrawer({ type: "consultant", item: c });
                        }}
                        title="More options"
                      >
                        <MoreVertical size={16}/>
                      </button>
                    </div>
                  </td>
                </tr>
              ); })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Footer / Pagination */}
      <div className="bench-footer">
        <div className="bench-showing">
          Showing {startIdx + 1}–{Math.min(startIdx + itemsPerPage, totalFiltered)} of {totalFiltered} consultants
        </div>
        <div className="bench-pagination">
          <button
            type="button"
            className="bench-pg-btn"
            disabled={validPage === 1}
            onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
          >
            &lt;
          </button>
          {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
            <button
              type="button"
              key={page}
              className={`bench-pg-btn ${validPage === page ? "active" : ""}`}
              onClick={() => setCurrentPage(page)}
            >
              {page}
            </button>
          ))}
          <button
            type="button"
            className="bench-pg-btn"
            disabled={validPage === totalPages}
            onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
          >
            &gt;
          </button>
        </div>
      </div>
    </div>
  );
}

/* ─── SKILL COVERAGE ─── */
const coverageData = [
  {
    skill: "Gen AI / LLM",
    jds: 3,
    jdsWidth: 44,
    bench: 2,
    benchWidth: 28,
    status: "short",
    shortfall: "short by 1",
    meaning: "Three vendors asking, two people, neither consented yet.",
  },
  {
    skill: "Kafka",
    jds: 4,
    jdsWidth: 58,
    bench: 0,
    benchWidth: 2,
    status: "short",
    shortfall: "short by 4",
    meaning: "Nobody has it. Four JDs we cannot answer at all.",
  },
  {
    skill: "ServiceNow",
    jds: 2,
    jdsWidth: 30,
    bench: 1,
    benchWidth: 16,
    status: "short",
    shortfall: "short by 1",
    meaning: "Daniel is our only one, and he is already interviewing.",
  },
  {
    skill: "Java / Spring Boot",
    jds: 6,
    jdsWidth: 86,
    bench: 14,
    benchWidth: 88,
    status: "covered",
    shortfall: "covered",
    meaning: "Deep. Six JDs, fourteen people, all authorised.",
  },
  {
    skill: "Snowflake / dbt",
    jds: 2,
    jdsWidth: 30,
    bench: 5,
    benchWidth: 48,
    status: "covered",
    shortfall: "covered",
    meaning: "Comfortable.",
  },
  {
    skill: "Selenium / Cypress",
    jds: 1,
    jdsWidth: 16,
    bench: 4,
    benchWidth: 40,
    status: "covered",
    shortfall: "covered",
    meaning: "Covered, but three of the four are over 60 days on bench.",
  },
];

function Skills({ consultants, navigate }) {
  return (
    <div className="coverage-page-content">
      {/* Header */}
      <div className="coverage-header">
        <div className="coverage-header-left">
          <div className="coverage-icon">
            <svg width="24" height="26" viewBox="0 0 20 22" fill="#0d2d59">
              <rect x="1" y="12" width="4" height="10" rx="1"/>
              <rect x="8" y="6" width="4" height="16" rx="1"/>
              <rect x="15" y="0" width="4" height="22" rx="1"/>
            </svg>
          </div>
          <div>
            <h1 className="coverage-title">Skill coverage</h1>
            <div className="coverage-sub1">What came in this week against who we have</div>
            <div className="coverage-sub2">15 – 19 September • 23 JDs • 47 consultants on bench • counted from the JD text and the bench record, not typed</div>
          </div>
        </div>
        <div className="coverage-badge">
          DERIVED, NEVER MAINTAINED
        </div>
      </div>

      {/* Table Card */}
      <div className="coverage-card">
        <table className="coverage-table">
          <thead>
            <tr>
              <th style={{ width: 180 }}>SKILL</th>
              <th style={{ width: 180 }}>JDs THIS WEEK</th>
              <th style={{ width: 180 }}>ON BENCH, AVAILABLE</th>
              <th style={{ width: 130 }}>SHORTFALL</th>
              <th>WHAT IT MEANS</th>
            </tr>
          </thead>
          <tbody>
            {coverageData.map((row, idx) => (
              <tr key={idx}>
                <td className="coverage-skill-cell">
                  {row.skill}
                </td>
                <td>
                  <div className="coverage-bar-cell">
                    <div className="coverage-bar-track">
                      <div
                        className="coverage-bar jds"
                        style={{ width: `${row.jdsWidth}px` }}
                      />
                    </div>
                    <span className="coverage-val">{row.jds}</span>
                  </div>
                </td>
                <td>
                  <div className="coverage-bar-cell">
                    <div className="coverage-bar-track">
                      <div
                        className={`coverage-bar bench ${row.bench === 0 ? "zero" : ""}`}
                        style={{ width: `${row.benchWidth}px` }}
                      />
                    </div>
                    <span className="coverage-val">{row.bench}</span>
                  </div>
                </td>
                <td>
                  <span className={`coverage-shortfall-pill ${row.status}`}>
                    {row.shortfall}
                  </span>
                </td>
                <td className="coverage-meaning-cell">
                  {row.meaning}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Info Callout */}
      <div className="coverage-callout">
        <div className="coverage-callout-icon">
          <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
            <circle cx="9" cy="9" r="9" fill="#0d2d59"/>
            <text x="9" y="13.2" textAnchor="middle" fill="#ffffff" fontSize="11" fontWeight="700" fontFamily="system-ui, -apple-system, sans-serif">i</text>
          </svg>
        </div>
        <div className="coverage-callout-content">
          <div className="coverage-callout-lead">
            This is the only screen in the product that is not about work in flight.
          </div>
          <p className="coverage-callout-desc">
            Everything else answers &quot;what do I do next&quot;. This answers &quot;what should we be hiring for&quot;, and it is the one thing a recruiter cannot fix by working harder. It belongs to whoever decides who we bring onto the bench.
          </p>
        </div>
      </div>
    </div>
  );
}

/* ─── CONSENT ─── */
const consentSeed = [
  {
    id: "CS-1",
    name: "Ramesh Kulkarni",
    role: "Senior Java Developer, Zenith",
    sent: "02:24",
    status: "CONSENTED",
    statusType: "consented",
    lastActionMain: "Replied 06:40",
    lastActionSub: "signed RTR attached",
    next: "—",
    actionType: "review",
    category: "Consented (5)",
  },
  {
    id: "CS-2",
    name: "Meera Iyer",
    role: "Data Engineer, Apex Partners",
    sent: "02:24",
    status: "CONSENTED",
    statusType: "consented",
    lastActionMain: "Replied 05:58",
    lastActionSub: "rate confirmed at $72/hr",
    next: "—",
    actionType: "review",
    category: "Consented (5)",
  },
  {
    id: "CS-3",
    name: "Vikram Rao",
    role: "Senior Java Developer, Zenith",
    sent: "02:24",
    status: "DECLINED",
    statusType: "declined",
    lastActionMain: "Replied 05:02",
    lastActionSub: "already in another interview loop",
    next: "Log and close",
    actionType: "none",
    category: "Declined (3)",
  },
  {
    id: "CS-4",
    name: "Ajay Verma",
    role: "Senior Java Developer, Zenith",
    sent: "02:24",
    status: "AWAITING · 7 h",
    statusType: "awaiting",
    lastActionMain: "Reminder queued",
    lastActionSub: "fires automatically at 24 h",
    next: "Send reminder now",
    actionType: "reminder",
    actionLabel: "Send Reminder",
    category: "Awaiting (14)",
  },
  {
    id: "CS-5",
    name: "Arjun Das",
    role: "Senior Java Developer, Zenith",
    sent: "02:24",
    status: "AWAITING · 7 h",
    statusType: "awaiting",
    lastActionMain: "Reminder due in 2 h",
    lastActionSub: "",
    next: "Send reminder now",
    actionType: "reminder",
    actionLabel: "Send Reminder",
    category: "Awaiting (14)",
  },
  {
    id: "CS-6",
    name: "Deepa Menon",
    role: "Senior Data Scientist, Helix",
    sent: "Yesterday",
    status: "AWAITING · 31 h",
    statusType: "awaiting",
    lastActionMain: "Reminder sent once",
    lastActionSub: "no reply after two attempts",
    next: "Call instead",
    actionType: "call",
    actionLabel: "Call Instead",
    category: "Awaiting (14)",
  },
  {
    id: "CS-7",
    name: "Nadia Haddad",
    role: "QA Automation, Apex Partners",
    sent: "02:24",
    status: "CONSENTED",
    statusType: "consented",
    lastActionMain: "Replied 08:02",
    lastActionSub: "availability re-confirmed",
    next: "—",
    actionType: "review",
    category: "Consented (5)",
  },
];

const consentFilters = [
  "All JDs",
  "Consented (5)",
  "Awaiting (14)",
  "Declined (3)",
  "Reminder due (4)",
  "Open over 24 h (1)",
];

function Consent({ consultants, notify, setDrawer }) {
  const [activeFilter, setActiveFilter] = useState("Awaiting (14)");

  const filteredData = consentSeed.filter(item => {
    if (activeFilter === "All JDs" || activeFilter === "Awaiting (14)") return true;
    if (activeFilter === "Consented (5)") return item.statusType === "consented";
    if (activeFilter === "Declined (3)") return item.statusType === "declined";
    if (activeFilter === "Reminder due (4)") return item.statusType === "awaiting";
    if (activeFilter === "Open over 24 h (1)") return item.sent === "Yesterday";
    return true;
  });

  return (
    <div className="consent-page-content">
      {/* Filters Section */}
      <div className="consent-filters-box">
        <div className="consent-filters-label">FILTERS</div>
        <div className="consent-filters-row">
          <div className="consent-pills-group">
            {consentFilters.map(filter => (
              <button
                type="button"
                key={filter}
                className={`consent-filter-pill ${activeFilter === filter ? "active" : ""}`}
                onClick={() => setActiveFilter(filter)}
              >
                {filter}
              </button>
            ))}
          </div>
          <div className="consent-badge">
            SENT WITHOUT APPROVAL — BY DESIGN
          </div>
        </div>
      </div>

      {/* Table Card */}
      <div className="consent-card">
        <div className="consent-card-header">
          <h2 className="consent-card-title">Every consent request</h2>
          <div className="consent-card-info-badge">
            <svg width="16" height="16" viewBox="0 0 18 18" fill="none">
              <circle cx="9" cy="9" r="9" fill="#0d2d59"/>
              <text x="9" y="13.2" textAnchor="middle" fill="#ffffff" fontSize="11" fontWeight="700" fontFamily="system-ui, -apple-system, sans-serif">i</text>
            </svg>
            <span>A consent is a timestamped fact, not a status somebody sets.</span>
          </div>
        </div>

        <table className="consent-table">
          <thead>
            <tr>
              <th style={{ width: "26%" }}>Consultant / JD</th>
              <th style={{ width: "12%" }}>Sent</th>
              <th style={{ width: "16%" }}>Status</th>
              <th style={{ width: "21%" }}>Last action</th>
              <th style={{ width: "13%" }}>Next</th>
              <th style={{ width: "12%" }}>Action</th>
            </tr>
          </thead>
          <tbody>
            {filteredData.map(row => (
              <tr key={row.id}>
                <td>
                  <div className="consent-consultant-cell">
                    <span className="consent-name">{row.name}</span>
                    <span className="consent-jd">→ {row.role}</span>
                  </div>
                </td>
                <td>
                  <span className="consent-sent">{row.sent}</span>
                </td>
                <td>
                  <span className={`consent-status-pill ${row.statusType}`}>
                    {row.status}
                  </span>
                </td>
                <td>
                  <div className="consent-action-cell">
                    <span className="consent-action-main">{row.lastActionMain}</span>
                    {row.lastActionSub && (
                      <span className="consent-action-sub">{row.lastActionSub}</span>
                    )}
                  </div>
                </td>
                <td>
                  <span className={`consent-next ${row.next === "—" ? "dash" : ""}`}>
                    {row.next}
                  </span>
                </td>
                <td>
                  <div className="consent-row-actions">
                    {row.actionType === "review" && (
                      <button
                        type="button"
                        className="consent-review-btn"
                        onClick={() => {
                          const c = consultants.find(c => c.name === row.name) || { name: row.name, status: "Ready to Submit", location: "Charlotte, NC", years: 8, rate: 75, skills: ["Java", "Spring Boot"] };
                          setDrawer({ type: "consultant", item: c });
                        }}
                      >
                        Review →
                      </button>
                    )}
                    {row.actionType === "reminder" && (
                      <button
                        type="button"
                        className="consent-outline-btn"
                        onClick={() => notify ? notify(`Reminder sent to ${row.name}`) : null}
                      >
                        {row.actionLabel}
                      </button>
                    )}
                    {row.actionType === "call" && (
                      <button
                        type="button"
                        className="consent-outline-btn"
                        onClick={() => notify ? notify(`Initiating call with ${row.name}`) : null}
                      >
                        {row.actionLabel}
                      </button>
                    )}
                    {row.actionType === "none" && (
                      <span className="consent-no-action">—</span>
                    )}
                    <button
                      type="button"
                      className="consent-dots-btn"
                      onClick={() => {
                        const c = consultants.find(c => c.name === row.name) || { name: row.name, status: row.status, location: "Charlotte, NC", years: 8, rate: 75, skills: ["Java", "Spring Boot"] };
                        setDrawer({ type: "consultant", item: c });
                      }}
                      title="More actions"
                    >
                      <MoreVertical size={16}/>
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Info Callout */}
      <div className="consent-callout">
        <div className="consent-callout-icon">
          <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
            <circle cx="9" cy="9" r="9" fill="#0d2d59"/>
            <text x="9" y="13.2" textAnchor="middle" fill="#ffffff" fontSize="11" fontWeight="700" fontFamily="system-ui, -apple-system, sans-serif">i</text>
          </svg>
        </div>
        <div className="consent-callout-content">
          <p className="consent-callout-text">
            Reminders fire on their own at 24 hours, once. After a second unanswered attempt the row turns red and asks for a person, because at that point an email is not the problem.
          </p>
          <p className="consent-callout-text">
            A decline is never a dead end — the consultant drops out of that JD and remains available for every other one.
          </p>
        </div>
      </div>
    </div>
  );
}

/* ─── SUBMISSIONS ─── */
const readyUnitsSeed = [
  {
    id: "RK",
    name: "Ramesh Kulkarni",
    role: "Senior Java Developer — Zenith",
    company: "Zenith Technologies",
    consentTime: "consent 06:40",
    rate: "$74/hr",
    status: "READY TO SUBMIT",
    candidateHeader: "Senior Java Developer — Zenith • 11 yrs • Green Card • Available now",
    details: {
      consultant: "Ramesh Kulkarni • 11 yrs • Green Card • Available now",
      jobDescription: "Senior Java Developer — Charlotte, NC • Zenith Technologies • 12 months",
      consent: "Received 06:40 today • signed RTR on file • IP and timestamp recorded",
      resume: "v4 – Zenith template applied • contact details masked",
      rate: "$74/hr C2C, confirmed with the consultant. The JD carried no rate, so this figure is ours to state.",
      availability: "Immediate • re-confirmed by the consultant in the consent reply",
      compliance: "Work authorization verified • no duplicate submission to this vendor in 90 days",
    },
    client: "Zenith",
  },
  {
    id: "SM",
    name: "Sofia Mendes",
    role: "Senior Java Developer — Zenith",
    company: "Zenith Technologies",
    consentTime: "consent 07:12",
    rate: "$78/hr",
    status: "READY TO SUBMIT",
    candidateHeader: "Senior Java Developer — Zenith • 9 yrs • USC • Available now",
    details: {
      consultant: "Sofia Mendes • 9 yrs • USC • Available now",
      jobDescription: "Senior Java Developer — Charlotte, NC • Zenith Technologies • 12 months",
      consent: "Received 07:12 today • signed RTR on file • IP and timestamp recorded",
      resume: "v3 – Zenith formatted • masked candidate info",
      rate: "$78/hr C2C, confirmed with the consultant. The JD carried no rate, so this figure is ours to state.",
      availability: "Immediate • re-confirmed by the consultant in the consent reply",
      compliance: "Work authorization verified • USC confirmed",
    },
    client: "Zenith",
  },
  {
    id: "MI",
    name: "Meera Iyer",
    role: "Data Engineer — Apex Partners",
    company: "Apex Partners",
    consentTime: "consent 05:58",
    rate: "$72/hr",
    status: "READY TO SUBMIT",
    candidateHeader: "Data Engineer — Apex Partners • 8 yrs • Green Card • Available now",
    details: {
      consultant: "Meera Iyer • 8 yrs • Green Card • Available now",
      jobDescription: "Data Engineer (Snowflake) — Remote • Apex Partners • 6 months",
      consent: "Received 05:58 today • rate confirmed at $72/hr • signed RTR on file",
      resume: "v2 – Apex standard template applied • contact details masked",
      rate: "$72/hr C2C, confirmed with the consultant. Rate aligned with vendor floor.",
      availability: "Immediate • re-confirmed by the consultant in the consent reply",
      compliance: "Work authorization verified • no duplicate submission to this vendor in 90 days",
    },
    client: "Apex Partners",
  },
  {
    id: "TL",
    name: "Tobias Lang",
    role: ".NET Core Developer — Zenith",
    company: "Zenith Technologies",
    consentTime: "consent 07:31",
    rate: "$71/hr",
    status: "READY TO SUBMIT",
    candidateHeader: ".NET Core Developer — Zenith • 7 yrs • H-1B • Available now",
    details: {
      consultant: "Tobias Lang • 7 yrs • H-1B • Available now",
      jobDescription: ".NET Core Developer — Dallas, TX • Zenith Technologies • 12 months",
      consent: "Received 07:31 today • signed RTR on file • IP and timestamp recorded",
      resume: "v3 – Zenith template applied • contact details masked",
      rate: "$71/hr C2C, confirmed with the consultant. The JD carried no rate.",
      availability: "Immediate • re-confirmed by the consultant in the consent reply",
      compliance: "H-1B transfer verification complete • clean client history",
    },
    client: "Zenith",
  },
  {
    id: "NH",
    name: "Nadia Haddad",
    role: "QA Automation — Apex Partners",
    company: "Apex Partners",
    consentTime: "consent 08:02",
    rate: "$68/hr",
    status: "READY TO SUBMIT",
    candidateHeader: "QA Automation — Apex Partners • 8 yrs • Green Card • Available now",
    details: {
      consultant: "Nadia Haddad • 8 yrs • Green Card • Available now",
      jobDescription: "QA Automation (Selenium) — Tampa, FL • Apex Partners • 12 months",
      consent: "Received 08:02 today • availability re-confirmed • RTR signed",
      resume: "v2 – Apex template applied • masked candidate info",
      rate: "$68/hr C2C, confirmed with the consultant. Directly matches vendor budget.",
      availability: "Immediate • re-confirmed by the consultant in the consent reply",
      compliance: "Work authorization verified • no duplicate submission in 90 days",
    },
    client: "Apex Partners",
  },
];

const vendorSubmissionsSeed = [
  {
    id: "VS-1",
    consultant: "Tobias Lang",
    role: ".NET Core Developer — Zenith",
    vendor: "Zenith Technologies",
    state: "SUBMITTED",
    waiting: "4 d",
    next: "Awaiting vendor response",
  },
  {
    id: "VS-2",
    consultant: "Aisha Nandakumar",
    role: "Data Engineer — Apex Partners",
    vendor: "Apex Partners",
    state: "SUBMITTED",
    waiting: "2 d",
    next: "Vendor acknowledged, screening",
  },
  {
    id: "VS-3",
    consultant: "Daniel Okonkwo",
    role: "ServiceNow Admin",
    vendor: "Nexus IT",
    state: "INTERVIEW SET",
    waiting: "6 d",
    next: "Round 1 on Tue 22 Sep, 10:00",
  },
];

function Submissions({ data, consultants, notify, setDrawer }) {
  const [selectedId, setSelectedId] = useState(null);

  const activeUnit = readyUnitsSeed.find(u => u.id === selectedId) || readyUnitsSeed[0];

  return (
    <div className="submissions-page-content">
      {/* Top Banner Row */}
      <div className="submissions-top-badge-row">
        {selectedId ? (
          <button
            type="button"
            className="submissions-back-btn"
            onClick={() => setSelectedId(null)}
          >
            <ArrowLeft size={15}/> Back to all submissions
          </button>
        ) : (
          <div className="submissions-summary-text">
            <b>{readyUnitsSeed.length} candidates</b> ready for submission • <b>{vendorSubmissionsSeed.length} active</b> in flight
          </div>
        )}
        <div className="submissions-human-badge">
          THE ONE HUMAN DECISION
        </div>
      </div>

      {selectedId ? (
        /* ─── CLICKED UNIT DETAIL VIEW (MATCHING REFERENCE EXACTLY) ─── */
        <div className="submissions-split-layout">
          {/* Left Panel: Ready to Submit List */}
          <aside className="submissions-left-panel">
            <div className="submissions-left-header">
              <h2 className="submissions-left-title">Ready to Submit</h2>
              <span className="submissions-count-badge">{readyUnitsSeed.length}</span>
            </div>

            <div className="submissions-units-list">
              {readyUnitsSeed.map(unit => {
                const isActive = unit.id === activeUnit.id;
                return (
                  <div
                    key={unit.id}
                    className={`submissions-unit-item ${isActive ? "active" : ""}`}
                    onClick={() => setSelectedId(unit.id)}
                  >
                    <div className="submissions-unit-avatar">
                      {unit.id}
                    </div>
                    <div className="submissions-unit-info">
                      <span className="submissions-unit-name">{unit.name}</span>
                      <span className="submissions-unit-role">{unit.role}</span>
                      <span className="submissions-unit-consent">{unit.consentTime}</span>
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="submissions-left-callout">
              <div className="submissions-left-callout-icon">
                <svg width="16" height="16" viewBox="0 0 18 18" fill="none">
                  <circle cx="9" cy="9" r="9" fill="#0d2d59"/>
                  <text x="9" y="13.2" textAnchor="middle" fill="#ffffff" fontSize="11" fontWeight="700" fontFamily="system-ui, -apple-system, sans-serif">i</text>
                </svg>
              </div>
              <p className="submissions-left-callout-text">
                Everything in this list assembled itself overnight. Nothing here has left the building.
              </p>
            </div>
          </aside>

          {/* Right Panel: Detail & Vendors Cards */}
          <main className="submissions-right-panel">
            {/* Candidate Hero Card */}
            <div className="submissions-hero-card">
              <div className="submissions-hero-left">
                <div className="submissions-hero-avatar">
                  {activeUnit.id}
                </div>
                <div>
                  <h1 className="submissions-hero-name">{activeUnit.name}</h1>
                  <p className="submissions-hero-sub">{activeUnit.candidateHeader}</p>
                </div>
              </div>
              <div className="submissions-hero-pill">
                READY TO SUBMIT
              </div>
            </div>

            {/* Submission Details Card */}
            <div className="submissions-detail-card">
              <div className="submissions-section-head">
                <div className="submissions-section-title-box">
                  <FileText size={18} className="submissions-detail-icon" strokeWidth={2.2}/>
                  <h2 className="submissions-section-title">Submission Details</h2>
                </div>
                <span className="submissions-section-subtitle">
                  Assembled automatically — review before you press
                </span>
              </div>

              <div className="submissions-fields-list">
                <div className="submissions-field-row">
                  <span className="submissions-field-label">CONSULTANT</span>
                  <span className="submissions-field-value">{activeUnit.details.consultant}</span>
                </div>
                <div className="submissions-field-row">
                  <span className="submissions-field-label">JOB DESCRIPTION</span>
                  <span className="submissions-field-value">{activeUnit.details.jobDescription}</span>
                </div>
                <div className="submissions-field-row">
                  <span className="submissions-field-label">CONSENT</span>
                  <span className="submissions-field-value">{activeUnit.details.consent}</span>
                </div>
                <div className="submissions-field-row">
                  <span className="submissions-field-label">RESUME</span>
                  <span className="submissions-field-value">{activeUnit.details.resume}</span>
                </div>
                <div className="submissions-field-row">
                  <span className="submissions-field-label">RATE</span>
                  <span className="submissions-field-value">{activeUnit.details.rate}</span>
                </div>
                <div className="submissions-field-row">
                  <span className="submissions-field-label">AVAILABILITY</span>
                  <span className="submissions-field-value">{activeUnit.details.availability}</span>
                </div>
                <div className="submissions-field-row">
                  <span className="submissions-field-label">COMPLIANCE</span>
                  <span className="submissions-field-value">{activeUnit.details.compliance}</span>
                </div>
              </div>

              <div className="submissions-action-buttons">
                <button
                  type="button"
                  className="submissions-btn-submit"
                  onClick={() => notify ? notify(`${activeUnit.name} submitted to ${activeUnit.client}!`) : null}
                >
                  Submit {activeUnit.name} to {activeUnit.client}
                </button>
                <button
                  type="button"
                  className="submissions-btn-secondary"
                  onClick={() => notify ? notify(`Editing rate for ${activeUnit.name}`) : null}
                >
                  Edit the rate
                </button>
                <button
                  type="button"
                  className="submissions-btn-secondary"
                  onClick={() => notify ? notify(`Held: message queued for ${activeUnit.name}`) : null}
                >
                  Hold — ask the consultant
                </button>
              </div>
            </div>

            {/* Already with Vendors Card */}
            <div className="submissions-vendors-card">
              <div className="submissions-section-head">
                <div className="submissions-section-title-box">
                  <Users size={18} className="submissions-detail-icon" strokeWidth={2.2}/>
                  <h2 className="submissions-section-title">Already with Vendors</h2>
                </div>
                <span className="submissions-vendors-pill">
                  This press is the one human decision in the flow
                </span>
              </div>

              <table className="submissions-vendors-table">
                <thead>
                  <tr>
                    <th style={{ width: "32%" }}>Consultant / JD</th>
                    <th style={{ width: "22%" }}>Vendor</th>
                    <th style={{ width: "16%" }}>State</th>
                    <th style={{ width: "10%" }}>Waiting</th>
                    <th>What happens next</th>
                  </tr>
                </thead>
                <tbody>
                  {vendorSubmissionsSeed.map(row => (
                    <tr key={row.id}>
                      <td>
                        <div className="submissions-vendor-consultant">
                          <span className="submissions-vendor-name">{row.consultant}</span>
                          <span className="submissions-vendor-role">{row.role}</span>
                        </div>
                      </td>
                      <td>
                        <span className="submissions-vendor-client">{row.vendor}</span>
                      </td>
                      <td>
                        <span className={`submissions-status-tag ${row.state === "SUBMITTED" ? "submitted" : "interview"}`}>
                          {row.state}
                        </span>
                      </td>
                      <td>
                        <span className="submissions-waiting">{row.waiting}</span>
                      </td>
                      <td>
                        <span className="submissions-next-desc">{row.next}</span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </main>
        </div>
      ) : (
        /* ─── BEFORE CLICKING: DETAILS TYPE ROWS SIMPLE PLAIN TABLE ─── */
        <div className="submissions-card">
          <div className="submissions-plain-header">
            <h2 className="submissions-card-title">Submissions Register</h2>
            <span className="submissions-plain-sub">
              Click any candidate unit to review package, verify compliance, and submit to vendor
            </span>
          </div>

          <table className="submissions-plain-table">
            <thead>
              <tr>
                <th style={{ width: "25%" }}>Consultant</th>
                <th style={{ width: "25%" }}>Role & Client</th>
                <th style={{ width: "12%" }}>Rate</th>
                <th style={{ width: "15%" }}>Consent Status</th>
                <th style={{ width: "13%" }}>State</th>
                <th style={{ width: "10%" }}>Action</th>
              </tr>
            </thead>
            <tbody>
              {readyUnitsSeed.map(unit => (
                <tr
                  key={unit.id}
                  className="submissions-plain-row"
                  onClick={() => setSelectedId(unit.id)}
                >
                  <td>
                    <div className="submissions-plain-consultant">
                      <div className="submissions-unit-avatar small">{unit.id}</div>
                      <div className="submissions-plain-info">
                        <b>{unit.name}</b>
                        <small>{unit.candidateHeader.split("•")[1] || ""}</small>
                      </div>
                    </div>
                  </td>
                  <td>
                    <span className="submissions-plain-role">{unit.role}</span>
                  </td>
                  <td>
                    <span className="submissions-plain-rate">{unit.rate}</span>
                  </td>
                  <td>
                    <span className="submissions-plain-consent">{unit.consentTime}</span>
                  </td>
                  <td>
                    <span className="submissions-status-tag ready">
                      {unit.status}
                    </span>
                  </td>
                  <td>
                    <button
                      type="button"
                      className="submissions-plain-action-btn"
                      onClick={e => { e.stopPropagation(); setSelectedId(unit.id); }}
                    >
                      Review Unit →
                    </button>
                  </td>
                </tr>
              ))}
              {vendorSubmissionsSeed.map(row => (
                <tr
                  key={row.id}
                  className="submissions-plain-row"
                  onClick={() => setSelectedId("RK")}
                >
                  <td>
                    <div className="submissions-plain-consultant">
                      <div className="submissions-unit-avatar small">{row.consultant.split(" ").map(w=>w[0]).join("")}</div>
                      <div className="submissions-plain-info">
                        <b>{row.consultant}</b>
                        <small>{row.vendor}</small>
                      </div>
                    </div>
                  </td>
                  <td>
                    <span className="submissions-plain-role">{row.role}</span>
                  </td>
                  <td>
                    <span className="submissions-plain-rate">$75/hr</span>
                  </td>
                  <td>
                    <span className="submissions-plain-consent">In flight · {row.waiting}</span>
                  </td>
                  <td>
                    <span className={`submissions-status-tag ${row.state === "SUBMITTED" ? "submitted" : "interview"}`}>
                      {row.state}
                    </span>
                  </td>
                  <td>
                    <button
                      type="button"
                      className="submissions-plain-action-btn"
                      onClick={e => { e.stopPropagation(); setSelectedId("RK"); }}
                    >
                      View →
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

/* ─── INBOX ─── */
function InboxPage({ messages, setMessages, setDrawer, setModal }) {
  const [q, setQ] = useState("");
  const data = messages.filter(m => (m.from + m.subject + m.preview).toLowerCase().includes(q.toLowerCase()));
  return (
    <>
      <Header title="Inbox" description="Staffing communication, vendor requests and consultant updates" actions={<button type="button" className="primary" onClick={() => setModal("compose")}><Mail size={14}/> Compose</button>}/>
      <div className="inbox-layout">
        <section className="panel inbox-list">
          <div className="inbox-toolbar">
            <label className="search">
              <Search size={14}/>
              <input value={q} onChange={e => setQ(e.target.value)} placeholder="Search messages"/>
            </label>
          </div>
          {data.map(m => (
            <button type="button" className={`message-row ${m.unread ? "unread" : ""}`} key={m.id}
              onClick={() => { setMessages(p => p.map(x => x.id===m.id?{...x,unread:false}:x)); setDrawer({type:"message",item:m}); }}>
              <div className="avatar soft">{initials(m.from)}</div>
              <div>
                <b>{m.from}</b>
                <strong>{m.subject}</strong>
                <span>{m.preview}</span>
              </div>
              <time>{m.time}</time>
            </button>
          ))}
        </section>
        <section className="panel inbox-empty">
          <Mail size={28}/>
          <h3>Select a message</h3>
          <p>Choose a conversation from your inbox to review its details.</p>
        </section>
      </div>
    </>
  );
}

/* ─── DRAWERS ─── */
function Drawer({ title, close, children }) {
  return (
    <>
      <div className="drawer-overlay" onClick={close}/>
      <aside className="drawer">
        <div className="drawer-header">
          <h2>{title}</h2>
          <button type="button" className="icon-button" onClick={close}><X size={17}/></button>
        </div>
        <div className="drawer-content">{children}</div>
      </aside>
    </>
  );
}

function JobDrawer({ item, close, navigate }) {
  return (
    <Drawer title="Job details" close={close}>
      <div className="drawer-hero">
        <div className="file-icon large"><BriefcaseBusiness size={18}/></div>
        <div><h2>{item.title}</h2><p>{item.company} · {item.location}</p></div>
      </div>
      <Info label="Request ID"  value={item.id}/>
      <Info label="Mode"        value={item.mode}/>
      <Info label="Experience"  value={item.exp}/>
      <Info label="Visa"        value={item.visa}/>
      <Info label="Source"      value={item.source}/>
      <div className="drawer-section">
        <label>Skills</label>
        <div className="tags big">{(item?.skills || []).map(s => <em key={s}>{s}</em>)}</div>
      </div>
      <div className="drawer-actions">
        <button type="button" className="secondary" onClick={close}>Close</button>
        <button type="button" className="primary" onClick={() => { close(); navigate(`/jd/${item?.id || 'REQ-4482'}`); }}>Open full JD</button>
      </div>
    </Drawer>
  );
}

function ConsultantDrawer({ item, close, consent, submit, notify }) {
  const [activeTab, setActiveTab] = useState("Overview");
  const [copiedKey, setCopiedKey] = useState(null);
  const bodyRef = React.useRef(null);

  // When candidate changes, scroll body to top and reset tab
  React.useEffect(() => {
    setActiveTab("Overview");
    if (bodyRef.current) {
      bodyRef.current.scrollTop = 0;
    }
  }, [item?.id]);

  // Support pressing Escape to close panel
  React.useEffect(() => {
    const handleKeyDown = e => {
      if (e.key === "Escape") close();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [close]);

  if (!item) return null;

  const cEmail = item.email || `${item.name.toLowerCase().replace(/[^a-z0-9]/g, ".")}@email.com`;
  const cPhone = item.phone || "+1 (704) 555-1234";
  const cLinkedIn = item.linkedin || `linkedin.com/in/${item.name.toLowerCase().replace(/[^a-z0-9]/g, "-")}`;
  const cFileName = item.fileName || `${item.name.replace(/\s+/g, "_")}_Resume.pdf`;
  const cBenchAge = item.benchAgeStr ? item.benchAgeStr.replace("d", " days") : (item.benchAge ? `${item.benchAge} days` : "18 days");
  const cAuth = item.auth || item.visa || "GC";
  const cAvail = item.available || item.availability || "Now";
  const cState = item.state || item.status || "Ready to Submit";
  const cSkills = item.skills && item.skills.length > 0 ? item.skills : ["Java", "Spring Boot", "AWS"];
  const matchPercent = item.quality ? Math.round(item.quality * 100) : (cSkills.length >= 3 ? 87 : 78);

  const candidateSubs = [
    {
      id: "sub-1",
      jd: `JD #JD-1024 – ${cSkills[0] || 'Software'} Engineer (${item.company || 'Client A'})`,
      pill: cState === "Interview Set" ? "Interview Set" : (cState === "Ready to Submit" ? "Consented" : "Pending"),
      pillClass: cState === "Interview Set" ? "pending" : (cState === "Ready to Submit" ? "consented" : "pending"),
      date: "20 Sep 2026"
    },
    {
      id: "sub-2",
      jd: `JD #JD-0987 – ${cSkills[1] || 'Cloud'} Developer (Client B)`,
      pill: "Pending",
      pillClass: "pending",
      date: "18 Sep 2026"
    },
    {
      id: "sub-3",
      jd: `JD #JD-0932 – ${cSkills[2] || 'Platform'} Specialist (Client C)`,
      pill: "No Reply",
      pillClass: "noreply",
      date: "12 Sep 2026"
    }
  ];

  const copyToClipboard = (text, key) => {
    if (navigator?.clipboard?.writeText) {
      navigator.clipboard.writeText(text);
      setCopiedKey(key);
      setTimeout(() => setCopiedKey(null), 1600);
    }
  };

  return (
    <aside className="consultant-panel" onClick={e => e.stopPropagation()}>
      {/* Header */}
      <div className="cp-header">
        <div className="cp-header-top">
          <div className="cp-header-left">
            <button type="button" className="cp-btn-close" onClick={close} title="Close (Esc)">
              <X size={18} />
            </button>
            <div className="cp-avatar">
              {item.initials || initials(item.name)}
            </div>
            <div className="cp-header-info">
              <div className="cp-name-row">
                <h2 className="cp-name">{item.name}</h2>
                <span className="cp-status-pill">{cState}</span>
              </div>
              <div className="cp-meta-row">
                <MapPin size={12} className="cp-pin-icon" />
                <span>{item.location} • {item.years} yrs</span>
              </div>
            </div>
          </div>
          <div className="cp-header-right">
            <button type="button" className="cp-btn-dots" onClick={e => e.stopPropagation()} title="More options">
              <MoreVertical size={16} />
            </button>
          </div>
        </div>

        <div className="cp-header-actions">
          <button
            type="button"
            className="cp-btn-submit"
            onClick={() => {
              submit?.(item);
              close();
            }}
          >
            <Send size={13} />
            <span>Submit Candidate</span>
          </button>
          <button type="button" className="cp-btn-edit" onClick={() => notify?.(`Editing ${item.name}`)}>
            <Edit2 size={13} />
            <span>Edit</span>
          </button>
        </div>

        <div className="cp-nav-tabs">
          {["Overview", "Resume", "Submissions (3)", "Interviews", "Notes (2)", "Activity"].map(tab => (
            <button
              type="button"
              key={tab}
              className={`cp-tab-btn ${activeTab === tab ? "active" : ""}`}
              onClick={() => setActiveTab(tab)}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>

      {/* Body */}
      <div className="cp-body" ref={bodyRef}>
        {/* Section 1: Candidate Overview */}
        <div className="cp-card">
          <div className="cp-card-title">
            <User size={15} />
            <span>Candidate Overview</span>
          </div>
          <div className="cp-overview-grid">
            <div className="cp-overview-col">
              <div className="cp-col-label">
                <Calendar size={13} />
                <span>Availability</span>
              </div>
              <div>
                <span className="cp-pill-avail">{cAvail}</span>
              </div>
            </div>

            <div className="cp-overview-col">
              <div className="cp-col-label">
                <CreditCard size={13} />
                <span>Visa / Authorization</span>
              </div>
              <div>
                <span className="cp-pill-auth">{cAuth}</span>
              </div>
            </div>

            <div className="cp-overview-col">
              <div className="cp-col-label">
                <Clock size={13} />
                <span>Bench Age</span>
              </div>
              <div className="cp-val-strong">
                {cBenchAge}
              </div>
            </div>

            <div className="cp-overview-col">
              <div className="cp-col-label">
                <Briefcase size={13} />
                <span>Employment Type</span>
              </div>
              <div className="cp-val-strong">
                Full Time
              </div>
            </div>
          </div>
        </div>

        {/* Row 2: Skills & Match Insights */}
        <div className="cp-two-col">
          {/* Skills Card */}
          <div className="cp-card">
            <div className="cp-card-header-flex">
              <div className="cp-card-title">
                <Code2 size={15} />
                <span>Skills</span>
              </div>
              <button type="button" className="cp-link-btn" onClick={() => notify?.("Skill added to profile")}>+ Add Skill</button>
            </div>
            <div className="cp-skills-wrap">
              {cSkills.map(sk => (
                <span key={sk} className="cp-skill-pill">{sk}</span>
              ))}
            </div>
          </div>

          {/* Match Insights Card */}
          <div className="cp-card">
            <div className="cp-card-header-flex">
              <div className="cp-card-title">
                <Target size={15} />
                <span>Match Insights</span>
              </div>
              <button type="button" className="cp-link-btn" onClick={e => e.preventDefault()}>View All</button>
            </div>
            <div className="cp-match-content">
              <div className="cp-match-circle-wrap">
                <svg className="cp-circle-svg" width="60" height="60" viewBox="0 0 36 36">
                  <path
                    className="cp-circle-bg"
                    d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                  />
                  <path
                    className="cp-circle-fill"
                    strokeDasharray={`${matchPercent}, 100`}
                    d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                  />
                  <text x="18" y="20.5" className="cp-circle-text">{matchPercent}%</text>
                </svg>
                <span className="cp-match-label">JD Match</span>
              </div>
              <div className="cp-matched-skills-col">
                <div className="cp-matched-title">Top Matched Skills</div>
                {cSkills.slice(0, 3).map(sk => (
                  <div key={sk} className="cp-matched-item">
                    <CheckCircle2 size={13} className="cp-check-green" />
                    <span>{sk}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Row 3: Contact Information & Resume Information */}
        <div className="cp-two-col">
          {/* Contact Information */}
          <div className="cp-card">
            <div className="cp-card-title">
              <Mail size={15} />
              <span>Contact Information</span>
            </div>
            <div className="cp-contact-list">
              <div className="cp-contact-item">
                <div className="cp-contact-left">
                  <Mail size={13} className="cp-contact-icon" />
                  <span className="cp-contact-text">{cEmail}</span>
                </div>
                <button
                  type="button"
                  className="cp-icon-action"
                  onClick={() => copyToClipboard(cEmail, "email")}
                  title="Copy email"
                >
                  {copiedKey === "email" ? <Check size={12} color="#16a34a"/> : <Copy size={12}/>}
                </button>
              </div>
              <div className="cp-contact-item">
                <div className="cp-contact-left">
                  <Phone size={13} className="cp-contact-icon" />
                  <span className="cp-contact-text">{cPhone}</span>
                </div>
                <button
                  type="button"
                  className="cp-icon-action"
                  onClick={() => copyToClipboard(cPhone, "phone")}
                  title="Copy phone"
                >
                  {copiedKey === "phone" ? <Check size={12} color="#16a34a"/> : <Copy size={12}/>}
                </button>
              </div>
              <div className="cp-contact-item">
                <div className="cp-contact-left">
                  <Linkedin size={13} className="cp-contact-icon" />
                  <span className="cp-contact-text link">{cLinkedIn}</span>
                </div>
                <button
                  type="button"
                  className="cp-icon-action"
                  onClick={() => {
                    if (typeof window !== "undefined") {
                      window.open(`https://${cLinkedIn}`, '_blank', 'noopener,noreferrer');
                    }
                  }}
                  title="Open LinkedIn"
                >
                  <ExternalLink size={12} />
                </button>
              </div>
            </div>
          </div>

          {/* Resume Information */}
          <div className="cp-card">
            <div className="cp-card-title">
              <FileText size={15} />
              <span>Resume Information</span>
            </div>
            <div className="cp-resume-grid">
              <div className="cp-resume-row">
                <span className="cp-res-label">File Name</span>
                <div className="cp-res-val-file">
                  <span className="cp-file-name">{cFileName}</span>
                  <Download size={13} className="cp-download-icon" />
                </div>
              </div>
              <div className="cp-resume-row">
                <span className="cp-res-label">Uploaded On</span>
                <span className="cp-res-val">10 Sep 2026</span>
              </div>
              <div className="cp-resume-row">
                <span className="cp-res-label">File Type</span>
                <span className="cp-res-val">PDF</span>
              </div>
              <div className="cp-resume-row">
                <span className="cp-res-label">File Size</span>
                <span className="cp-res-val">842 KB</span>
              </div>
            </div>
          </div>
        </div>

        {/* Section 4: Submission & Consent */}
        <div className="cp-card">
          <div className="cp-card-header-flex">
            <div className="cp-card-title">
              <Send size={15} />
              <span>Submission & Consent</span>
            </div>
            <button type="button" className="cp-link-btn" onClick={e => e.preventDefault()}>View All</button>
          </div>
          <div className="cp-submissions-list">
            {candidateSubs.map(sub => (
              <div className="cp-sub-item" key={sub.id}>
                <div className="cp-sub-title">
                  <span className="cp-bullet">•</span>
                  <span>{sub.jd}</span>
                </div>
                <span className={`cp-sub-pill ${sub.pillClass}`}>{sub.pill}</span>
                <span className="cp-sub-date">{sub.date}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Row 5: Recent Activity & Notes (2) */}
        <div className="cp-two-col">
          {/* Recent Activity */}
          <div className="cp-card">
            <div className="cp-card-header-flex">
              <div className="cp-card-title">
                <ClipboardList size={15} />
                <span>Recent Activity</span>
              </div>
              <button type="button" className="cp-link-btn" onClick={e => e.preventDefault()}>View All</button>
            </div>
            <div className="cp-timeline">
              <div className="cp-timeline-item">
                <div className="cp-timeline-dot green" />
                <div className="cp-timeline-content">
                  <div className="cp-tl-title-row">
                    <span className="cp-tl-heading">
                      {cState === "Interview Set" ? "Interview round 1 confirmed" : (cState === "Ready to Submit" ? "Consent received for submission" : "Profile reviewed by recruiter")}
                    </span>
                    <span className="cp-tl-date">20 Sep 2026, 11:24 AM</span>
                  </div>
                  <p className="cp-tl-sub">
                    {cState === "Interview Set" ? "Interview scheduled with vendor screening team." : "Candidate provided consent & standard template applied."}
                  </p>
                </div>
              </div>
              <div className="cp-timeline-item">
                <div className="cp-timeline-dot gray" />
                <div className="cp-timeline-content">
                  <div className="cp-tl-title-row">
                    <span className="cp-tl-heading">Resume parsed and profile created</span>
                    <span className="cp-tl-date">15 Sep 2026, 04:10 PM</span>
                  </div>
                  <p className="cp-tl-sub">AI parsed resume and extracted {cSkills.length} key skills.</p>
                </div>
              </div>
              <div className="cp-timeline-item">
                <div className="cp-timeline-dot gray" />
                <div className="cp-timeline-content">
                  <div className="cp-tl-title-row">
                    <span className="cp-tl-heading">Candidate added to bench</span>
                    <span className="cp-tl-date">12 Sep 2026, 02:15 PM</span>
                  </div>
                  <p className="cp-tl-sub">Added by Priya (Recruiter).</p>
                </div>
              </div>
            </div>
          </div>

          {/* Notes (2) */}
          <div className="cp-card">
            <div className="cp-card-header-flex">
              <div className="cp-card-title">
                <FileText size={15} />
                <span>Notes (2)</span>
              </div>
              <button type="button" className="cp-link-btn" onClick={() => notify?.("Note added")}>+ Add Note</button>
            </div>
            <div className="cp-notes-list">
              <div className="cp-note-item">
                <div className="cp-note-avatar p">P</div>
                <div className="cp-note-body">
                  <p className="cp-note-text">
                    Good communication and strong {cSkills[0] || 'technical'} background. Available {cAvail.toLowerCase().includes('now') ? 'immediately' : 'from ' + cAvail}.
                  </p>
                  <span className="cp-note-meta">Priya • 20 Sep 2026, 11:30 AM</span>
                </div>
                <button type="button" className="cp-btn-dots-small" onClick={e => e.stopPropagation()}>
                  <MoreVertical size={13} />
                </button>
              </div>
              <div className="cp-note-item">
                <div className="cp-note-avatar s">S</div>
                <div className="cp-note-body">
                  <p className="cp-note-text">
                    Interested in long term opportunities. Open to {item.location?.toLowerCase().includes('remote') ? 'remote roles' : 'onsite in ' + item.location}.
                  </p>
                  <span className="cp-note-meta">Shivani • 18 Sep 2026, 02:15 PM</span>
                </div>
                <button type="button" className="cp-btn-dots-small" onClick={e => e.stopPropagation()}>
                  <MoreVertical size={13} />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </aside>
  );
}

function MessageDrawer({ item, close, notify }) {
  return (
    <Drawer title="Message" close={close}>
      <div className="message-detail">
        <span>{item?.tag || "Inbox"}</span>
        <h2>{item?.subject || "Message"}</h2>
        <p>From <b>{item?.from || "Sender"}</b> · {item?.time || ""} ago</p>
        <div className="mail-body">
          {item?.preview || ""}<br/><br/>
          Please review the request and take the appropriate action from Bench Sales.
        </div>
      </div>
      <div className="drawer-actions">
        <button type="button" className="secondary" onClick={close}>Close</button>
        <button type="button" className="primary" onClick={() => { close(); notify?.("Reply sent"); }}>Reply</button>
      </div>
    </Drawer>
  );
}

/* ─── MODALS ─── */
function Modal({ title, close, children }) {
  return (
    <>
      <div className="modal-overlay" onClick={close}/>
      <div className="modal">
        <div className="modal-head">
          <h2>{title}</h2>
          <button type="button" className="icon-button" onClick={close}><X size={17}/></button>
        </div>
        <div className="modal-body">{children}</div>
      </div>
    </>
  );
}

function JobModal({ close, save }) {
  const [form, setForm] = useState({ title:"", company:"", location:"", mode:"Remote", skills:"Java, Spring Boot", exp:"5+ yrs", visa:"USC / GC", source:"Manual" });
  const change = (k, v) => setForm(p => ({ ...p, [k]: v }));
  return (
    <Modal title="Add job description" close={close}>
      <div className="form-grid">
        <Field label="Job title"   value={form.title}    onChange={v => change("title",v)}    placeholder="e.g. Senior Java Developer"/>
        <Field label="Company"     value={form.company}  onChange={v => change("company",v)}  placeholder="Client or vendor"/>
        <Field label="Location"    value={form.location} onChange={v => change("location",v)} placeholder="City, State or Remote"/>
        <Field label="Experience"  value={form.exp}      onChange={v => change("exp",v)}/>
        <Field label="Skills"      value={form.skills}   onChange={v => change("skills",v)}   full/>
        <label>Work mode
          <select value={form.mode} onChange={e => change("mode", e.target.value)}>
            <option>Remote</option><option>Hybrid</option><option>Onsite</option>
          </select>
        </label>
      </div>
      <div className="modal-actions">
        <button type="button" className="secondary" onClick={close}>Cancel</button>
        <button type="button" className="primary" disabled={!form.title || !form.company}
          onClick={() => save({ ...form, skills: form.skills.split(",").map(s=>s.trim()).filter(Boolean), state:"New" })}>
          Create JD
        </button>
      </div>
    </Modal>
  );
}

function ConsultantModal({ close, save }) {
  const [form, setForm] = useState({ name:"", location:"", years:5, skills:"Java, Spring Boot", availability:"Now", visa:"USC", benchAge:0, status:"Available", type:"Internal", rate:75 });
  const change = (k, v) => setForm(p => ({ ...p, [k]: v }));
  return (
    <Modal title="Add consultant" close={close}>
      <div className="form-grid">
        <Field label="Name"       value={form.name}     onChange={v => change("name",v)}     placeholder="Full name"/>
        <Field label="Location"   value={form.location} onChange={v => change("location",v)} placeholder="City, State"/>
        <Field label="Experience" value={form.years}    onChange={v => change("years",Number(v))}/>
        <Field label="Rate / hour"value={form.rate}     onChange={v => change("rate",Number(v))}/>
        <Field label="Skills"     value={form.skills}   onChange={v => change("skills",v)}   full/>
        <label>Visa
          <select value={form.visa} onChange={e => change("visa", e.target.value)}>
            <option>USC</option><option>GC</option><option>H-1B</option>
          </select>
        </label>
      </div>
      <div className="modal-actions">
        <button type="button" className="secondary" onClick={close}>Cancel</button>
        <button type="button" className="primary" disabled={!form.name}
          onClick={() => save({ ...form, skills: form.skills.split(",").map(s=>s.trim()).filter(Boolean), years:Number(form.years), rate:Number(form.rate), initials: initials(form.name), role: `${form.name} — Bench` })}>
          Add consultant
        </button>
      </div>
    </Modal>
  );
}

function ComposeModal({ close, notify }) {
  return (
    <Modal title="Compose message" close={close}>
      <div className="form-stack">
        <Field label="To"      placeholder="vendor@example.com"/>
        <Field label="Subject" placeholder="Message subject"/>
        <label>Message<textarea rows="6" placeholder="Write your message..."/></label>
      </div>
      <div className="modal-actions">
        <button type="button" className="secondary" onClick={close}>Cancel</button>
        <button type="button" className="primary" onClick={() => { close(); notify("Message sent"); }}><Send size={14}/> Send</button>
      </div>
    </Modal>
  );
}

/* ─── UTILITIES ─── */
function Info({ label, value }) {
  return <div className="info"><span>{label}</span><b>{value}</b></div>;
}
function Field({ label, value, onChange, placeholder, full }) {
  return (
    <label className={full ? "full" : ""}>
      {label}
      <input value={value ?? ""} onChange={e => onChange?.(e.target.value)} placeholder={placeholder}/>
    </label>
  );
}

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }
  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }
  componentDidCatch(error, errorInfo) {
    console.error("ErrorBoundary caught an error:", error, errorInfo);
  }
  render() {
    if (this.state.hasError) {
      return (
        <div style={{ padding: 40, fontFamily: "sans-serif", textAlign: "center" }}>
          <h2 style={{ color: "#0d2d59" }}>Something went wrong.</h2>
          <p style={{ color: "#64748b" }}>{this.state.error?.message}</p>
          <button
            onClick={() => { this.setState({ hasError: false }); window.location.reload(); }}
            style={{ padding: "8px 16px", background: "#0d2d59", color: "#fff", border: "none", borderRadius: 6, cursor: "pointer" }}
          >
            Reload Page
          </button>
        </div>
      );
    }
    return this.props.children;
  }
}

/* ─── MOUNT ─── */
createRoot(document.getElementById("root")).render(
  <ErrorBoundary>
    <App/>
  </ErrorBoundary>
);
