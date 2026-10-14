document.addEventListener("DOMContentLoaded", () => {
	const navbar = document.querySelector(".main-navbar");
	const menuToggle = document.querySelector(".navbar-toggler");
	const navigation = document.querySelector("#navbarNav");
	const navigationLinks = document.querySelectorAll(".navbar-nav .nav-link");
	const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

	if (!reduceMotion && "IntersectionObserver" in window) {
		const revealItems = document.querySelectorAll(".experience-item, .technical-skill-list > div, .certification-item");
		const revealObserver = new IntersectionObserver((entries, observer) => {
			entries.forEach((entry) => {
				if (entry.isIntersecting) {
					entry.target.classList.add("is-visible");
					observer.unobserve(entry.target);
				}
			});
		}, { threshold: 0.12 });

		revealItems.forEach((item, index) => {
			item.classList.add("reveal");
			item.style.setProperty("--reveal-delay", `${(index % 3) * 80}ms`);
			revealObserver.observe(item);
		});
	}

	menuToggle.addEventListener("click", () => {
		const isExpanded = menuToggle.getAttribute("aria-expanded") === "true";
		menuToggle.setAttribute("aria-expanded", String(!isExpanded));
		navigation.classList.toggle("show", !isExpanded);
	});

	navigationLinks.forEach((link) => {
		link.addEventListener("click", () => {
			navigation.classList.remove("show");
			menuToggle.setAttribute("aria-expanded", "false");
		});
	});

	window.addEventListener("scroll", () => {
		let currentSection = "hero";
		document.querySelectorAll("header[id], section[id]").forEach((section) => {
			if (window.scrollY >= section.offsetTop - navbar.offsetHeight - 1) currentSection = section.id;
		});
		navigationLinks.forEach((link) => {
			link.parentElement.classList.toggle("active", link.getAttribute("href") === `#${currentSection}`);
		});
	});
});