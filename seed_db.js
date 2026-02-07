
const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./database.sqlite');

const profile = {
    name: "Kushagra Singh Negi",
    role: "Web Developer",
    bio: "Hello! I'm Kushagra! Your web development enthusiast. Always down for something new and challenging! Just like markdown, I'm here to help you create beautifully formatted websites.",
    location: "Jaipur, India",
    email: "kushagra910200@gmail.com",
    resume_link: "https://react-portfolio-gamma-tan.vercel.app/assets/Kushagra_Singh_Negi_Resume-gcquH3cz.pdf"
};

const links = [
    { platform: "LinkedIn", url: "https://www.linkedin.com/in/kushh01/" },
    { platform: "GitHub", url: "https://github.com/Kushagra001" },
    { platform: "Telegram", url: "https://t.me/kush_001" },
    { platform: "Discord", url: "https://discord.com" } // Username: _kushh01
];

const projects = [
    {
        title: "React Portfolio",
        description: "Developed a ReactJS portfolio with interactive design.\nIntegrated Three.js to create smooth 3D background effects.\nShowcased modern UI with a focus on performance and visuals.",
        link: "https://kushagra.vercel.app/",
        repo_link: "https://github.com/Kushagra001/React-Portfolio",
        tags: JSON.stringify(["React", "Three.js", "Framer Motion"])
    },
    {
        title: "Linkify Project",
        description: "Built a real-time chat app using the MERN stack.\nIntegrated Socket.io for seamless, low-latency messaging.\nDesigned with authentication and scalable chat features.",
        link: "", // No live link found
        repo_link: "https://github.com/Kushagra001/Linkify",
        tags: JSON.stringify(["MERN Stack", "Socket.io", "JWT"])
    },
    {
        title: "Chatbot Project",
        description: "Developed an intelligent chatbot using MERN stack.\nIntegrated OpenAI API to handle queries and coding questions.\nDelivered interactive, AI-driven assistance with smooth UI.",
        link: "", // No live link found
        repo_link: "https://github.com/Kushagra001/Chatbot",
        tags: JSON.stringify(["React", "Node.js", "OpenAI"])
    },
    {
        title: "Food App Project",
        description: "Developed a food ordering UI using ReactJS.\nDesigned category filters, top picks, and cart/profile pages.\nCreated a clean, responsive interface inspired by modern food-delivery apps.",
        link: "https://food-app-kushagra001.vercel.app/",
        repo_link: "https://github.com/Kushagra001/Food-App",
        tags: JSON.stringify(["React", "CSS Modules"])
    },
    {
        title: "Job Tracker Assistant",
        description: "Developed a app to organize and track job applications.\nIncludes an interactive dashboard for monitoring progress and success rates.\nIntegrated resume management with AI-powered review and job matching.",
        link: "", // No live link found
        repo_link: "https://github.com/Kushagra001/Job-Tracker-Assistant",
        tags: JSON.stringify(["MERN Stack", "AI Integration"])
    }
];

const skills = [
    { name: "React", level: "Advanced", is_top: 1 },
    { name: "Node.js", level: "Intermediate", is_top: 1 },
    { name: "MERN Stack", level: "Advanced", is_top: 1 },
    { name: "Socket.io", level: "Intermediate", is_top: 0 },
    { name: "Three.js", level: "Intermediate", is_top: 0 },
    { name: "OpenAI API", level: "Intermediate", is_top: 1 },
    { name: "Framer Motion", level: "Intermediate", is_top: 0 }
];

db.serialize(() => {
    // Clear existing data
    db.run("DELETE FROM profile");
    db.run("DELETE FROM education"); // No education data found yet
    db.run("DELETE FROM skills");
    db.run("DELETE FROM projects");
    db.run("DELETE FROM work"); // No work data found yet
    db.run("DELETE FROM links");

    // Insert Profile
    const stmtProfile = db.prepare("INSERT INTO profile (name, role, bio, location, email, resume_link) VALUES (?, ?, ?, ?, ?, ?)");
    stmtProfile.run(profile.name, profile.role, profile.bio, profile.location, profile.email, profile.resume_link);
    stmtProfile.finalize();

    // Insert Links
    const stmtLinks = db.prepare("INSERT INTO links (platform, url) VALUES (?, ?)");
    links.forEach(l => stmtLinks.run(l.platform, l.url));
    stmtLinks.finalize();

    // Insert Projects
    const stmtProjects = db.prepare("INSERT INTO projects (title, description, link, repo_link, tags) VALUES (?, ?, ?, ?, ?)");
    projects.forEach(p => stmtProjects.run(p.title, p.description, p.link, p.repo_link, p.tags));
    stmtProjects.finalize();

    // Insert Skills
    const stmtSkills = db.prepare("INSERT INTO skills (name, level, is_top) VALUES (?, ?, ?)");
    skills.forEach(s => stmtSkills.run(s.name, s.level, s.is_top));
    stmtSkills.finalize();

    console.log("Database seeded successfully.");
});

db.close();
