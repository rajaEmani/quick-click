let customSearch = {
    items: [
        {
            id: 'search-google',
            title: 'Google',
            url: 'https://www.google.com/search?q={searchTerms}',
        },
        {
            id: 'search-stackoverflow',
            title: 'Stack Overflow',
            url: 'https://stackoverflow.com/search?q={searchTerms}',
        }
    ]
}

chrome.contextMenus.create(
    {
        title: "Click quick",
        id: "ancient",
        contexts: ["selection"]
    });

for (let i = 0; i < customSearch.items.length; i++) {
    chrome.contextMenus.create(
        {
            title: customSearch.items[i].title,
            id: customSearch.items[i].id,
            parentId: "ancient",
            contexts: ["selection"]
        });
}

chrome.contextMenus.onClicked.addListener(function (info, tab) {
    const selectedText = info.selectionText;
    const menuItemId = info.menuItemId;
    for (let i = 0; i < customSearch.items.length; i++) {
        if (customSearch.items[i].id === menuItemId) {
            const url = customSearch.items[i].url.replace('{searchTerms}', selectedText);
            chrome.tabs.create({url: url}).then(r => console.log(r));
            break;
        }
    }
});