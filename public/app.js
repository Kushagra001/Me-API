
const API_URL = '/api';

async function fetchProfile() {
    const res = await fetch(`${API_URL}/profile`);
    return await res.json();
}

async function fetchProjects(skill = '') {
    const url = skill ? `${API_URL}/projects?skill=${encodeURIComponent(skill)}` : `${API_URL}/projects`;
    const res = await fetch(url);
    return await res.json();
}

async function fetchSkills() {
    const res = await fetch(`${API_URL}/skills`);
    return await res.json();
}

function renderProfile(data) {
    const main = document.getElementById('main-content');
    main.innerHTML = `
        <div class="section profile-card">
            <h1 class="profile-name">${data.name}</h1>
            <div class="profile-role">${data.role} &bull; ${data.location}</div>
            <p class="profile-bio">${data.bio}</p>
            <div class="social-links">
                ${data.links.map(link => `<a href="${link.url}" target="_blank" class="social-btn">${link.platform}</a>`).join('')}
                <a href="${data.resume_link}" target="_blank" class="social-btn" style="background:var(--primary-color);color:white;border:none;">Download Resume</a>
            </div>
        </div>
    `;
}

function renderProjects(projects, currentSearch = '') {
    const main = document.getElementById('main-content');
    main.innerHTML = `
        <div class="section">
            <h2 style="text-align:center;margin-bottom:10px;">Featured Projects</h2>
            <div style="text-align:center;margin-bottom:30px;">
                <input type="text" id="skill-search" placeholder="Search by skill (e.g., React)..." value="${currentSearch}" 
                    style="padding:10px;width:300px;border-radius:6px;border:1px solid var(--border-color);background:var(--card-bg);color:var(--text-color);"
                    oninput="handleSearch(this.value)">
            </div>
            <div class="grid">
                ${projects.length > 0 ? projects.map(p => `
                    <div class="card">
                        <h3>${p.title}</h3>
                        <p>${p.description.replace(/\n/g, '<br>')}</p>
                        <div class="card-tags">
                             ${p.tags.map(tag => `<span class="tag" onclick="filterByTag('${tag}')" style="cursor:pointer;">${tag}</span>`).join('')}
                        </div>
                        <div class="card-links">
                            ${p.repo_link ? `<a href="${p.repo_link}" target="_blank" class="card-link">GitHub</a>` : ''}
                            ${p.link ? `<a href="${p.link}" target="_blank" class="card-link">Live Demo</a>` : ''}
                        </div>
                    </div>
                `).join('') : '<p style="text-align:center;color:#8b949e;">No projects found matching that skill.</p>'}
            </div>
        </div>
    `;

    // Focus logic
    const input = document.getElementById('skill-search');
    if (input && currentSearch) {
        input.focus();
        // Set cursor to end
        input.setSelectionRange(input.value.length, input.value.length);
    }
}

let searchTimeout;
async function handleSearch(query) {
    // Simple debounce
    clearTimeout(searchTimeout);
    searchTimeout = setTimeout(async () => {
        const projects = await fetchProjects(query);
        renderProjects(projects, query);
    }, 300);
}

async function filterByTag(tag) {
    const projects = await fetchProjects(tag);
    renderProjects(projects, tag);
}

function renderSkills(skills) {
    const main = document.getElementById('main-content');
    main.innerHTML = `
        <div class="section">
            <h2 style="text-align:center;margin-bottom:30px;">Skills & Expertise</h2>
            <div class="skills-list">
                ${skills.map(s => `
                    <div class="skill-item ${s.is_top ? 'skill-top' : ''}">
                        ${s.name}
                        ${s.is_top ? '<span style="font-size:0.8em;color:var(--secondary-color)">★</span>' : ''}
                    </div>
                `).join('')}
            </div>
        </div>
    `;
}

async function showSection(section) {
    const main = document.getElementById('main-content');
    main.innerHTML = '<div id="loading">Loading...</div>';

    try {
        if (section === 'profile') {
            const data = await fetchProfile();
            renderProfile(data);
        } else if (section === 'projects') {
            const data = await fetchProjects();
            renderProjects(data);
        } else if (section === 'skills') {
            const data = await fetchSkills();
            renderSkills(data);
        }
    } catch (err) {
        main.innerHTML = `<div style="text-align:center;color:red;">Error loading content: ${err.message}</div>`;
    }
}

// Initial load
document.addEventListener('DOMContentLoaded', () => {
    showSection('profile');
});
