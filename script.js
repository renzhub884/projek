
if (!localStorage.getItem('user_sibah')) {
    localStorage.setItem('user_sibah', 'sawit331');
}

function login() {
    const user = document.getElementById("username")?.value.trim();
    const pass = document.getElementById("password")?.value;
    const errorMsg = document.getElementById("errorMsg");
    if (!user || !pass) {
        if (errorMsg) {
            errorMsg.innerText = "Username dan password harus diisi!";
            errorMsg.style.display = "block";
        }
        return;
    }
    const storedPass = localStorage.getItem('user_' + user);
    if (storedPass && storedPass === pass) {
        sessionStorage.setItem("isLoggedIn", "true");
        sessionStorage.setItem("currentUser", user);
        window.location.href = "main.html";
    } else {
        if (errorMsg) {
            errorMsg.innerText = "Username atau password salah!";
            errorMsg.style.display = "block";
        }
    }
}

document.addEventListener("keypress", function(event) {
    if (event.key === "Enter" && document.getElementById("password") && document.activeElement.id === "password") {
        event.preventDefault();
        if (window.location.pathname.includes("register")) {
            register();
        } else {
            login();
        }
    }
});

function register() {
    const user = document.getElementById("username")?.value.trim();
    const pass = document.getElementById("password")?.value;
    const errorMsg = document.getElementById("errorMsg");
    const successMsg = document.getElementById("successMsg");

    if (!user || !pass) {
        if (errorMsg) {
            errorMsg.innerText = "Username dan Password tidak boleh kosong!";
            errorMsg.style.display = "block";
        }
        if (successMsg) successMsg.style.display = "none";
        return;
    }

    if (localStorage.getItem('user_' + user)) {
        if (errorMsg) {
            errorMsg.innerText = "Username sudah terdaftar! Cari nama samaran lain, Agent.";
            errorMsg.style.display = "block";
        }
        if (successMsg) successMsg.style.display = "none";
    } else {
        localStorage.setItem('user_' + user, pass);
        if (errorMsg) errorMsg.style.display = "none";
        if (successMsg) {
            successMsg.innerText = "Registrasi berhasil! Mengalihkan ke halaman login...";
            successMsg.style.display = "block";
        }
        setTimeout(() => { window.location.href = "index.html"; }, 1500);
    }
}

function logout() {
    sessionStorage.removeItem("isLoggedIn");
    sessionStorage.removeItem("currentUser");
    window.location.href = "index.html";
}

function checkAuth() {
    if (!sessionStorage.getItem("isLoggedIn")) {
        window.location.href = "index.html";
    }
}

document.addEventListener("DOMContentLoaded", () => {
    
    const userDisplay = document.getElementById("userDisplay");
    if (userDisplay) {
        userDisplay.innerText = sessionStorage.getItem("currentUser") || "GUEST";
    }

    
    const fileInput = document.getElementById("f");
    if (fileInput) {
        const fnameDisplay = document.getElementById("fname");
        const inputArea = document.getElementById("i");
        const status = document.getElementById("st");
        if (fnameDisplay && inputArea && status) {
            fileInput.onchange = () => {
                let f = fileInput.files[0];
                if (f) {
                    fnameDisplay.innerText = "📂 " + f.name;
                    let r = new FileReader();
                    r.onload = (e) => {
                        inputArea.value = e.target.result;
                        status.innerText = "Status: Ready";
                    };
                    r.onerror = () => {
                        status.innerText = "Status: Gagal membaca file";
                    };
                    r.readAsText(f, "UTF-8");
                } else {
                    fnameDisplay.innerText = "UPLOAD FILE LUA";
                    inputArea.value = "";
                    status.innerText = "FREE OBFUSCATE";
                }
            };
        }
    }
});

function runObfuscator() {
    const inputArea = document.getElementById("i");
    const outputArea = document.getElementById("o");
    const status = document.getElementById("st");

    let src = inputArea ? inputArea.value : "";
    if (!src) {
        alert("Text area kosong! Masukkan Script nya dulu jing.");
        return;
    }

    
    let key = "SBH" + Math.random().toString(36).substring(2, 5);
    let chaosData = "";

    for (let j = 0; j < src.length; j++) {
        let charCode = src.charCodeAt(j) ^ key.charCodeAt(j % key.length);
        
        if (charCode === 34) { 
            chaosData += '\\"';
        } else if (charCode === 92) {
            chaosData += "\\\\";"
        } else if (charCode < 32 || charCode > 126) {
            
            chaosData += "\\" + charCode.toString(8).padStart(3, '0');
        } else {
            chaosData += String.fromCharCode(charCode);
        }
    }

    let header = "--[[ This file was generated by Sawit OBF ]]\n\n";
    
    let logic = `J=function(f,k,d)local r=""for i=1,#d do r=r..string.char(d:byte(i)~k:byte((i-1)%#k+1))end return f(r)end`;
    let final = header + `return({${logic}})["J"](loadstring or load,"${key}","${chaosData}")(...)`;

   
    final = final.replace(/\s+(?=(?:[^"]*"[^"]*")*[^"]*$)/g, "");

    if (outputArea) outputArea.value = final;
    if (status) status.innerText = "Successfully Obfuscate!";
}

function cp() {
    const outputArea = document.getElementById("o");
    if (!outputArea || !outputArea.value) {
        alert("Belum ada result yang bisa dicopy, eksekusi dulu!");
        return;
    }
    
    navigator.clipboard.writeText(outputArea.value).then(() => {
        const status = document.getElementById("st");
        if (status) status.innerText = "STATUS: SCRIPT COPIED TO CLIPBOARD!";
    }).catch(() => {
        alert("Gagal menyalin ke clipboard.");
    });
}

function dl() {
    const outputArea = document.getElementById("o");
    if (!outputArea || !outputArea.value) {
        alert("Belum ada result yang bisa didownload!");
        return;
    }
    let a = document.createElement("a");
    a.href = URL.createObjectURL(new Blob([outputArea.value], { type: "text/plain" }));
    a.download = "Beta_obfuscate.lua";
    a.click();
    URL.revokeObjectURL(a.href);
}

function rs() {
    const inputArea = document.getElementById("i");
    const outputArea = document.getElementById("o");
    const fileInput = document.getElementById("f");
    const fname = document.getElementById("fname");
    const status = document.getElementById("st");

    if (inputArea) inputArea.value = "";
    if (outputArea) outputArea.value = "";
    if (fileInput) fileInput.value = "";
    if (fname) fname.innerText = "UPLOAD FILE LUA";
    if (status) status.innerText = "FREE OBFUSCATE";))
}
