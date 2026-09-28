const publicationList = document.querySelector('#publication-list');

if (publicationList) {
    fetch('publications.json')
        .then((response) => {
            if (!response.ok) {
                throw new Error(`Could not load publications (${response.status}).`);
            }
            return response.json();
        })
        .then((publications) => {
            const sortedPublications = publications.slice().sort((a, b) => b.year - a.year);
            const cards = sortedPublications.map((publication) => {
                const card = document.createElement('article');
                card.className = 'publication-card';
                if (publication.bibcode.startsWith('20') && publication.bibcode.includes('ascl')) {
                    card.classList.add('is-software');
                }

                const header = document.createElement('div');
                header.className = 'publication-card-header';

                const heading = document.createElement('h2');
                const titleLink = document.createElement('a');
                titleLink.href = `https://scixplorer.org/abs/${encodeURIComponent(publication.bibcode)}/abstract`;
                titleLink.target = '_blank';
                titleLink.rel = 'noopener noreferrer';
                titleLink.textContent = publication.title;
                heading.append(titleLink);

                const year = document.createElement('span');
                year.className = 'publication-year';
                year.textContent = String(publication.year);
                header.append(heading, year);

                const authors = document.createElement('p');
                authors.className = 'publication-authors';
                authors.textContent = `${publication.authors.join('; ')}${publication.etAl ? '; et al.' : ''}`;

                const abstract = document.createElement('p');
                abstract.className = 'publication-abstract';
                abstract.textContent = publication.abstract;

                card.append(header, authors, abstract);
                return card;
            });

            publicationList.replaceChildren(...cards);
            publicationList.setAttribute('aria-busy', 'false');
        })
        .catch((error) => {
            const message = document.createElement('p');
            message.className = 'publication-error';
            message.textContent = 'The publication list could not be loaded. Try the author search on SciX above.';
            publicationList.replaceChildren(message);
            publicationList.setAttribute('aria-busy', 'false');
            console.error(error);
        });
}
