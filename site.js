const visitorNumber = document.querySelector('#visitor-number');

if (visitorNumber) {
    const nineDigitNumber = Math.floor(Math.random() * 900_000_000) + 100_000_000;
    visitorNumber.textContent = nineDigitNumber.toLocaleString('en-US');
}

document.addEventListener('click', (event) => {
    const dropdownTrigger = event.target.closest('.dropdown > a');

    if (dropdownTrigger) {
        event.preventDefault();
        const dropdown = dropdownTrigger.closest('.dropdown');
        const isOpen = dropdown.classList.toggle('is-open');
        dropdownTrigger.setAttribute('aria-expanded', String(isOpen));

        document.querySelectorAll('.dropdown.is-open').forEach((otherDropdown) => {
            if (otherDropdown !== dropdown) {
                otherDropdown.classList.remove('is-open');
                otherDropdown.querySelector(':scope > a')?.setAttribute('aria-expanded', 'false');
            }
        });
        return;
    }

    if (!event.target.closest('.dropdown')) {
        document.querySelectorAll('.dropdown.is-open').forEach((dropdown) => {
            dropdown.classList.remove('is-open');
            dropdown.querySelector(':scope > a')?.setAttribute('aria-expanded', 'false');
        });
    }
});

document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') {
        document.querySelectorAll('.dropdown.is-open').forEach((dropdown) => {
            dropdown.classList.remove('is-open');
            const trigger = dropdown.querySelector(':scope > a');
            trigger?.setAttribute('aria-expanded', 'false');
            trigger?.focus();
        });
    }
});
