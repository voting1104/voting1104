<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Secure Voting Portal</title>
    <style>
        :root {
            --primary: #0078d4;
            --success: #16a34a;
            --danger: #dc2626;
            --dark: #1e293b;
            --manager-color: #6d28d9;
            --bg: #f1f5f9;
        }

        body {
            font-family: 'Inter', 'Segoe UI', sans-serif;
            background: var(--bg);
            display: flex;
            justify-content: center;
            padding: 20px;
            margin: 0;
            color: var(--dark);
        }

        .container {
            background: white;
            width: 100%;
            max-width: 600px;
            padding: 30px;
            border-radius: 24px;
            box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1);
        }

        h2 {
            text-align: center;
            font-weight: 800;
            margin-bottom: 24px;
        }

        input {
            width: 100%;
            padding: 12px 16px;
            margin: 8px 0;
            border: 1.5px solid #e2e8f0;
            border-radius: 10px;
            box-sizing: border-box;
            font-size: 14px;
            transition: 0.2s;
        }

        input:focus {
            outline: none;
            border-color: var(--primary);
            box-shadow: 0 0 0 3px rgba(0, 120, 212, 0.1);
        }

        button {
            width: 100%;
            padding: 12px;
            border: none;
            border-radius: 10px;
            cursor: pointer;
            font-weight: 600;
            transition: all 0.2s;
            margin-top: 10px;
            display: flex;
            align-items: center;
            justify-content: center;
            gap: 8px;
        }

        button:active {
            transform: scale(0.98);
        }

        .btn-outlook {
            background: var(--primary);
            color: white;
        }

        .btn-login {
            background: var(--dark);
            color: white;
        }

        .btn-vote {
            background: var(--success);
            color: white;
            width: auto;
            padding: 8px 24px;
        }

        .btn-toggle {
            background: #f59e0b;
            color: white;
        }

        .btn-toggle.active {
            background: #10b981;
        }

        .btn-add {
            background: var(--dark);
            color: white;
            width: auto;
            margin-top: 0;
        }

        .btn-danger {
            background: #fee2e2;
            color: var(--danger);
            border: 1px solid #fecaca;
            margin-top: 40px;
        }

        .btn-logout {
            background: #f8fafc;
            color: #64748b;
            border: 1px solid #e2e8f0;
            margin-top: 20px;
        }

        .external-link {
            display: inline-block;
            margin-top: 10px;
            color: var(--primary);
            font-size: 13px;
            font-weight: 600;
            text-decoration: none;
            border-bottom: 1px solid transparent;
            transition: 0.2s;
        }

        .external-link:hover {
            border-bottom: 1px solid var(--primary);
        }

        .card {
            border: 1px solid #e2e8f0;
            padding: 16px;
            border-radius: 16px;
            margin-bottom: 12px;
            display: flex;
            align-items: center;
            background: #fff;
            transition: 0.3s;
        }

        .symbol-frame {
            width: 60px;
            height: 60px;
            border-radius: 50%;
            background: #f8fafc;
            margin-right: 16px;
            display: flex;
            align-items: center;
            justify-content: center;
            overflow: hidden;
            border: 2px solid #e2e8f0;
            flex-shrink: 0;
        }

        .symbol-frame img {
            width: 100%;
            height: 100%;
            object-fit: cover;
        }

        .name-txt {
            flex-grow: 1;
            font-weight: 700;
            font-size: 16px;
        }

        .result-pill {
            background: #eff6ff;
            color: var(--primary);
            padding: 6px 14px;
            border-radius: 99px;
            font-weight: 800;
            font-size: 14px;
        }

        .manager-section {
            background: #f8fafc;
            padding: 20px;
            border-radius: 16px;
            border: 1px solid #e2e8f0;
            margin-bottom: 24px;
        }

        .result-view-box {
            background: #fffbeb;
            border: 2px solid #fde68a;
            padding: 20px;
            border-radius: 16px;
            margin-top: 20px;
        }

        .hidden {
            display: none;
        }

        label {
            font-size: 12px;
            font-weight: 700;
            color: #64748b;
            text-transform: uppercase;
            letter-spacing: 0.05em;
        }

        .hint {
            font-size: 11px;
            color: #94a3b8;
            margin-bottom: 8px;
            display: block;
        }

        .delete-cand {
            color: var(--danger);
            font-size: 18px;
            cursor: pointer;
            margin-left: 10px;
            padding: 5px;
        }

        @keyframes fadeIn {
            from {
                opacity: 0;
                transform: translateY(10px);
            }

            to {
                opacity: 1;
                transform: translateY(0);
            }
        }

        .animate {
            animation: fadeIn 0.4s ease forwards;
        }
    </style>
</head>

<body>

    <div class="container">

        <!-- LOGIN PAGE -->
        <div id="loginSection" class="animate">
            <div style="text-align: center; font-size: 50px; margin-bottom: 10px;">🗳️</div>
            <h2>Election Portal</h2>
            <input type="text" id="loginID" placeholder="Enter Voter ID">
            <input type="password" id="loginPass" placeholder="Enter Password">
            <button class="btn-login" onclick="handleLogin()">Sign In to Ballot</button>

            <div style="text-align: center; margin-top: 25px;">
                <p style="font-size:12px; color:#94a3b8; margin: 0;">Authorized Portal Access</p>
                <a href="#" id="voterHelpLink" target="_blank" class="external-link">🌐 Visit Official Voting
                    Website</a>
            </div>
        </div>

        <!-- MANAGER DASHBOARD -->
        <div id="managerDash" class="hidden animate">
            <h2 style="color: var(--manager-color);">Admin Console</h2>

            <div class="manager-section">
                <label>1. Voting Portal Configuration</label>
                <span class="hint">Set the URL voters must click in Outlook.</span>
                <input type="text" id="siteUrl" placeholder="https://your-website.com" oninput="updateLiveLinks()">
                <a href="#" id="previewLink" target="_blank" class="external-link">🔗 Click to Test Your Link</a>
            </div>

            <div class="manager-section">
                <label>2. Voter Authorization (Outlook Email)</label>
                <input type="email" id="vEmail" placeholder="Voter's Email Address">
                <div style="display: flex; gap: 8px;">
                    <input type="text" id="vID" placeholder="Voter ID">
                    <input type="text" id="vPass" placeholder="Password">
                </div>
                <button class="btn-outlook" onclick="registerAndSendLink()">📧 Generate & Send Outlook Link</button>
                <span class="hint" style="margin-top: 8px; text-align: center;">The voting link will appear at the TOP
                    of the email body.</span>
            </div>

            <div class="manager-section">
                <label>3. Candidate Standings</label>
                <div style="display: flex; gap: 8px; margin-bottom: 15px;">
                    <input type="text" id="newCandName" placeholder="New Candidate Name" style="margin:0;">
                    <button class="btn-add" onclick="addCandidate()">Add</button>
                </div>
                <div id="managerResults"></div>
            </div>

            <div class="manager-section">
                <label>4. Results Visibility</label>
                <button id="toggleResultsBtn" class="btn-toggle" onclick="toggleResultsVisibility()">Show Results to
                    Voters: OFF</button>
            </div>

            <button class="btn-danger" onclick="resetElection()">⚠️ Reset All Election Data</button>
            <button class="btn-logout" onclick="logout()">Logout</button>
        </div>

        <!-- VOTER DASHBOARD -->
        <div id="voterDash" class="hidden animate">
            <h2 style="color: var(--success);">Digital Ballot</h2>
            <p id="voterName" style="text-align:center; font-size: 14px; color: #64748b; margin-top:-15px;"></p>

            <div id="voterBallot"></div>

            <div id="voterResultsView" class="hidden result-view-box">
                <h3 style="text-align:center; margin-top:0; font-size: 16px;">Current Election Tally</h3>
                <div id="voterResultsContent"></div>
            </div>

            <div id="votedSuccess" class="hidden"
                style="text-align:center; padding:20px; background: #f0fdf4; border-radius: 16px; border: 1px solid #bbf7d0;">
                <h2 style="color: var(--success); margin:0;">✅ Vote Cast</h2>
                <p style="font-size: 14px; color: #166534;">Your selection has been securely recorded.</p>
            </div>

            <button class="btn-logout" onclick="logout()">Logout</button>
        </div>
    </div>

    <script>
        // --- DATA ---
        let candidates = JSON.parse(localStorage.getItem('election_candidates')) || {
            "Monesh": { votes: 0, image: "" },
            "Rajesh": { votes: 0, image: "" },
            "Gnan": { votes: 0, image: "" }
        };
        let voters = JSON.parse(localStorage.getItem('election_voters')) || [];
        let showResultsToVoters = JSON.parse(localStorage.getItem('showResults')) || false;
        let savedSiteUrl = localStorage.getItem('voting_site_url') || window.location.href;

        const MID = "23b81a05hw";
        const MPASS = "shankarifamily";
        let activeVoter = null;

        window.onload = function () {
            document.getElementById('siteUrl').value = savedSiteUrl;
            updateLiveLinks();
        }

        function updateLiveLinks() {
            const url = document.getElementById('siteUrl').value;
            document.getElementById('previewLink').href = url;
            document.getElementById('voterHelpLink').href = url;
            localStorage.setItem('voting_site_url', url);
        }

        function showView(id) {
            document.querySelectorAll('.container > div').forEach(d => d.classList.add('hidden'));
            document.getElementById(id).classList.remove('hidden');
        }

        // --- LOGIN ---
        function handleLogin() {
            const id = document.getElementById('loginID').value;
            const pass = document.getElementById('loginPass').value;
            if (id === MID && pass === MPASS) { loadManager(); }
            else {
                const voter = voters.find(v => v.id === id && v.pass === pass);
                if (voter) { activeVoter = voter; loadVoter(); }
                else { alert("Access Denied! Check credentials."); }
            }
        }

        // --- UPDATED OUTLOOK LINK LOGIC ---
        function registerAndSendLink() {
            const email = document.getElementById('vEmail').value;
            const id = document.getElementById('vID').value;
            const pass = document.getElementById('vPass').value;
            const url = document.getElementById('siteUrl').value;

            if (!email || !id || !pass || !url) return alert("All fields are required to generate the email.");

            // Save to local voter list
            voters.push({ id, pass, email, hasVoted: false });
            saveData();

            const subject = encodeURIComponent("ACTION REQUIRED: Online Voting Portal Link & Access");

            // The URL is placed at the TOP of the body
            const body = encodeURIComponent(
                `Hello,\n\n` +
                `You have been invited to vote. Please click the link below to open the portal:\n\n` +
                `${url}\n\n` +
                `----------------------------------\n` +
                `YOUR LOGIN CREDENTIALS:\n` +
                `Voter ID: ${id}\n` +
                `Password: ${pass}\n` +
                `----------------------------------\n\n` +
                `Please do not share these credentials with anyone else.`
            );

            const outlookUrl = `https://outlook.office.com/mail/deeplink/compose?to=${email}&subject=${subject}&body=${body}`;
            window.open(outlookUrl, '_blank');

            loadManager();
        }

        // --- CANDIDATE MANAGEMENT ---
        function loadManager() {
            showView('managerDash');
            updateToggleBtn();
            renderManagerCandidates();
        }

        function renderManagerCandidates() {
            const list = document.getElementById('managerResults');
            list.innerHTML = "";
            Object.keys(candidates).forEach(name => {
                const card = document.createElement('div');
                card.className = "card";
                const imgHtml = candidates[name].image ? `<img src="${candidates[name].image}">` : `👤`;
                card.innerHTML = `
                <div class="symbol-frame">${imgHtml}</div>
                <div class="name-txt">${name} <br>
                    <button class="btn-add" style="font-size:10px; padding:2px 5px;" onclick="document.getElementById('file_${name}').click()">Change Photo</button>
                    <input type="file" id="file_${name}" class="hidden" accept="image/*" onchange="uploadImage('${name}', event)">
                </div>
                <div class="result-pill">${candidates[name].votes} Votes</div>
                <span class="delete-cand" onclick="deleteCandidate('${name}')">×</span>
            `;
                list.appendChild(card);
            });
        }

        function addCandidate() {
            const name = document.getElementById('newCandName').value.trim();
            if (!name) return;
            candidates[name] = { votes: 0, image: "" };
            saveData();
            document.getElementById('newCandName').value = "";
            renderManagerCandidates();
        }

        function deleteCandidate(name) {
            if (confirm(`Remove candidate: ${name}?`)) {
                delete candidates[name];
                saveData();
                renderManagerCandidates();
            }
        }

        // --- VOTER LOGIC ---
        function loadVoter() {
            showView('voterDash');
            document.getElementById('voterName').innerText = `ID: ${activeVoter.id}`;
            updateVoterUI();
        }

        function updateVoterUI() {
            const ballot = document.getElementById('voterBallot');
            const resBox = document.getElementById('voterResultsView');
            ballot.innerHTML = "";

            if (activeVoter.hasVoted) {
                document.getElementById('votedSuccess').classList.remove('hidden');
            } else {
                Object.keys(candidates).forEach(name => {
                    const card = document.createElement('div');
                    card.className = 'card animate';
                    const imgHtml = candidates[name].image ? `<img src="${candidates[name].image}">` : `👤`;
                    card.innerHTML = `
                    <div class="symbol-frame">${imgHtml}</div>
                    <div class="name-txt">${name}</div>
                    <button class="btn-vote" onclick="castVote('${name}')">Vote</button>
                `;
                    ballot.appendChild(card);
                });
            }

            if (showResultsToVoters) {
                resBox.classList.remove('hidden');
                document.getElementById('voterResultsContent').innerHTML = Object.keys(candidates).map(name =>
                    `<div style="display:flex; justify-content:space-between; padding:8px 0; border-bottom:1px solid #f1f5f9;">
                    <b>${name}</b> <span>${candidates[name].votes} Votes</span>
                </div>`
                ).join("");
            }
        }

        function castVote(name) {
            if (confirm(`Confirm your vote for ${name}?`)) {
                candidates[name].votes++;
                voters.find(v => v.id === activeVoter.id).hasVoted = true;
                activeVoter.hasVoted = true;
                saveData();
                updateVoterUI();
            }
        }

        // --- SYSTEM HELPERS ---
        function saveData() {
            localStorage.setItem('election_candidates', JSON.stringify(candidates));
            localStorage.setItem('election_voters', JSON.stringify(voters));
            localStorage.setItem('showResults', JSON.stringify(showResultsToVoters));
        }

        function uploadImage(name, event) {
            const reader = new FileReader();
            reader.onload = (e) => { candidates[name].image = e.target.result; saveData(); renderManagerCandidates(); };
            reader.readAsDataURL(event.target.files[0]);
        }

        function toggleResultsVisibility() {
            showResultsToVoters = !showResultsToVoters;
            saveData();
            updateToggleBtn();
        }

        function updateToggleBtn() {
            const btn = document.getElementById('toggleResultsBtn');
            btn.innerText = showResultsToVoters ? "Results Visible: ON" : "Results Visible: OFF";
            btn.classList.toggle('active', showResultsToVoters);
        }

        function resetElection() {
            if (confirm("DANGER: This will delete ALL voters and candidates. Continue?")) {
                localStorage.clear();
                location.reload();
            }
        }

        function logout() { location.reload(); }
    </script>
</body>

</html>
