Web_archive like system

Requirements
- (3) frontend, like react with 
    - searchbar - search existing saved data
    - list savedHtml

- (1) backend, node.js - check
    - html
        - GET all results, filter on keywords
        - save html, ds, url 

- (2) build/populate results: 
    - playwright js 
    - script, takes in seed url(s)
        - download full page, save images, etc.
            - save html
            - download assets for offline (images/videos)
            - reconstruct page
        - crawl, iterate, save links
        - add links to queue
        - stop if no links
        - guard repeat links
