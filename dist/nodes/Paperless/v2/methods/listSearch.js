"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.correspondentSearch = correspondentSearch;
exports.customFieldSearch = customFieldSearch;
exports.documentSearch = documentSearch;
exports.documentTypeSearch = documentTypeSearch;
exports.storagePathSearch = storagePathSearch;
exports.tagSearch = tagSearch;
exports.documentNoteSearch = documentNoteSearch;
const transport_1 = require("../transport");
async function resourceSearch(resource, accessor, filter) {
    if (filter && filter.trim().length >= 3) {
        const endpoint = `/search/`;
        const query = { query: filter };
        const responses = (await transport_1.apiRequestPaginated.call(this, 0, 'GET', endpoint, undefined, query));
        const [result] = responses;
        return {
            results: result
                ? result.body[resource].map((item) => ({
                    name: String(item[accessor]),
                    value: item.id,
                }))
                : [],
        };
    }
    const endpoint = `/${resource}/`;
    const responses = (await transport_1.apiRequestPaginated.call(this, 0, 'GET', endpoint));
    const results = responses
        .reduce((acc, response) => acc.concat(response.body.results), [])
        .slice(0, 30);
    return {
        results: results.map((item) => ({
            name: String(item[accessor]),
            value: item.id,
        })),
    };
}
async function correspondentSearch(filter) {
    return resourceSearch.call(this, 'correspondents', 'name', filter);
}
async function customFieldSearch(filter) {
    return resourceSearch.call(this, 'custom_fields', 'name', filter);
}
async function documentSearch(filter) {
    return resourceSearch.call(this, 'documents', 'title', filter);
}
async function documentTypeSearch(filter) {
    return resourceSearch.call(this, 'document_types', 'name', filter);
}
async function storagePathSearch(filter) {
    return resourceSearch.call(this, 'storage_paths', 'name', filter);
}
async function tagSearch(filter) {
    return resourceSearch.call(this, 'tags', 'name', filter);
}
async function documentNoteSearch(filter) {
    const documentId = this.getCurrentNodeParameter('id').value;
    const endpoint = `/documents/${documentId}/notes/`;
    const responses = (await transport_1.apiRequestPaginated.call(this, 0, 'GET', endpoint));
    return {
        results: responses
            .reduce((acc, response) => acc.concat(response.body), [])
            .filter((item) => !filter || item.note.includes(filter))
            .slice(0, 30)
            .map((item) => ({
            name: item.note.trim().length > 80 ? `${item.note.trim().slice(0, 80)}...` : item.note.trim(),
            value: item.id,
        })),
    };
}
//# sourceMappingURL=listSearch.js.map