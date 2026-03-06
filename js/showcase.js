const SHEET_URL =
  "https://docs.google.com/spreadsheets/d/e/2PACX-1vSeQ8Qv5kAM6sA2WTMU1rmBqv6SHIYeEjBBxy2qmmjzsqbdggAJ78PntUrZgpcPYtXmINgOMZV0ej4V/pub?output=csv";
let allProjects = [];

function init() {
  document.getElementById("year").textContent = new Date().getFullYear();
  Papa.parse(SHEET_URL, {
    download: true,
    header: true,
    complete: function (results) {
      allProjects = results.data.filter((item) => item.Title && item.Image);
      setupFilters(allProjects);
      renderGallery(allProjects);
    },
  });
}

function setupFilters(data) {
  const filterContainer = document.getElementById("filter-container");
  const categories = [
    "All",
    ...new Set(data.map((item) => item.Category || "Other")),
  ];

  filterContainer.innerHTML = "";
  categories.forEach((cat) => {
    const btn = document.createElement("button");
    btn.textContent = cat;
    btn.className = `filter-btn px-4 py-1 text-[10px] font-bold uppercase tracking-widest rounded-full border border-slate-200 transition-all ${cat === "All" ? "bg-slate-800 text-white border-slate-800" : "bg-white text-slate-400"}`;

    btn.onclick = () => {
      document.querySelectorAll(".filter-btn").forEach((b) => {
        b.className =
          "filter-btn px-4 py-1 text-[10px] font-bold uppercase tracking-widest rounded-full border border-slate-200 transition-all bg-white text-slate-400";
      });
      btn.className =
        "filter-btn px-4 py-1 text-[10px] font-bold uppercase tracking-widest rounded-full border border-slate-800 transition-all bg-slate-800 text-white";

      const filtered =
        cat === "All"
          ? allProjects
          : allProjects.filter((p) => (p.Category || "Other") === cat);
      renderGallery(filtered);
    };
    filterContainer.appendChild(btn);
  });
}

function renderGallery(data) {
  const gallery = document.getElementById("gallery");
  const loader = document.getElementById("loader");

  if (loader) loader.classList.add("hidden");
  gallery.classList.remove("hidden");
  gallery.innerHTML = "";

  const sortedData = [...data].reverse();

  if (sortedData.length === 0) {
    gallery.innerHTML =
      '<p class="text-center text-slate-400 col-span-3 mt-10 tracking-widest text-xs uppercase">No projects found.</p>';
    return;
  }

  sortedData.forEach((item, index) => {
    const card = document.createElement("a");
    card.href = item.Link || "#";
    card.target = "_blank";
    card.className =
      "block bg-white rounded-[24px] overflow-hidden border border-slate-100 shadow-sm animate-card group hover:shadow-md transition-all duration-300";

    card.style.animationDelay = `${index * 100}ms`;

    const category = (item.Category || "").toLowerCase();
    const isMobile = category.includes("mobile") || category.includes("app");
    const containerClass = isMobile
      ? "p-1 bg-slate-100 flex items-center justify-center"
      : "p-0 bg-slate-200 block";

    const imgClass = isMobile
      ? "h-full w-auto object-contain shadow-lg group-hover:scale-105"
      : "w-full h-full object-cover object-top group-hover:scale-105";

    card.innerHTML = `
      <div class="aspect-video w-full relative overflow-hidden border-b border-slate-100 ${containerClass}">
          <img src="${item.Image}" alt="${item.Title}"
                  class="transition-transform duration-500 ${imgClass}"
                  onerror="this.src='https://via.placeholder.com/600x400?text=Image+Error'">
          
          <div class="absolute inset-0 bg-slate-900/0 group-hover:bg-slate-900/5 transition-colors duration-300 pointer-events-none"></div>
      </div>
      
      <div class="p-6">
          <div class="flex justify-between items-center mb-3">
              <span class="text-[9px] font-bold text-slate-400 uppercase tracking-[1.5px] border border-slate-100 px-2 py-1 rounded bg-slate-50">
                  ${item.Category || "FILE"}
              </span>
          </div>
          <h3 class="text-[16px] font-bold text-slate-800 leading-snug group-hover:text-blue-600 transition-colors">
              ${item.Title}
          </h3>
      </div>
    `;
    gallery.appendChild(card);
  });
}

init();
