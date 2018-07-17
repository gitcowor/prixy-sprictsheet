// GET https://api.scratch.mit.edu/proxy/featured
(function sendAPIreq() {
  const url = "https://api.scratch.mit.edu/proxy/featured";
  const tabs = document.getElementById("tabs");
  const container = document.getElementById("result");
  fetch(url)
    .then(response => response.json())
    .then(function(data) {
      let projects = data;
      for (var project in projects) {
        let section = createNode("div");
        section.className = "section open";
        append(container, section);
        let anchor = createNode("a");
        anchor.name = project;
        anchor.className = "anchor";
        append(section, anchor);
        let title = createNode("h3");
        title.className = "title";
        title.innerHTML = project.replace(/_/g, " ");
        title.addEventListener('click', function() {
          section.classList.toggle('open');
        }, false);
        append(section, title);
        let ul = createNode("ul");
        append(section, ul);
        projects[project].map(function(data) {
          let imageContainer = createNode("a");
          imageContainer.href = "https://scratch.mit.edu/projects/" + data.id + "/";
          imageContainer.className = "imageContainer";
          let li = createNode("li"),
            img = createNode("img"),
            description = createNode("div");
          img.className = "thumbnail";
          img.src = "https:" + data.thumbnail_url;
          description.className = "desc";
          description.innerHTML = `${data.title} by ${data.creator}`;
          append(imageContainer, img);
          append(imageContainer, description);
          append(li, imageContainer);
          append(ul, li);
        });
        let tab = createNode("a");
        tab.href = "#" + project;
        tab.innerHTML = project === "scratch_design_studio" ? "SDS"
          : project === "curator_top_projects" ? "curated"
          : project.replace(/_/g, " ").replace(/community|projects/g, "").trim();
        append(tabs, tab);
      }
    })
    .catch(function(error) {
      console.error(error);
    });
})();

function createNode(element) {
  return document.createElement(element);
}

function append(parent, el) {
  return parent.appendChild(el);
}
