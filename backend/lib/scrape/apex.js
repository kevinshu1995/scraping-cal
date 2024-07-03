import axios from "axios";
import { parseHTML } from "linkedom";

const URL = {
    tournaments: "https://liquipedia.net/apexlegends/Portal:Tournaments",
};

function findPrevNodeSpecifically(el, nodeName = "") {
    if (!el || !el?.previousSibling) {
        // * can't find anything
        return null;
    }
    if ((el.previousSibling?.nodeName).toLowerCase() === nodeName.toLowerCase()) {
        return el.previousSibling;
    }
    return findPrevNodeSpecifically(el.previousSibling, nodeName);
}

async function getTournaments() {
    try {
        const response = await axios.get(URL.tournaments);
        const { document } = parseHTML(response.data);

        const tableClass = {
            gridTable: {
                table: ".gridTable",
                headerRow: ".gridHeader",
                bodyRow: ".gridRow",
                cell: ".gridCell",
            },
            divTable: {
                table: ".divTable",
                headerRow: ".divHeaderRow",
                bodyRow: ".divRow",
                cell: ".divCell",
            },
        };

        // * 爬資料時出現的錯誤
        const scrapeError = [];

        // * 有兩種 table 分別要抓 (gridTable, divTable)
        const [gridTableObjects, divTableObjects] = ["gridTable", "divTable"].map(type => {
            const elTables = [...document.querySelectorAll(tableClass[type].table)];
            return elTables.map(elTable => {
                const headers = [...elTable.querySelectorAll(tableClass[type].headerRow)];
                const rows = [...elTable.querySelectorAll(tableClass[type].bodyRow)];
                const tableTitle = (findPrevNodeSpecifically(elTable, "h2")?.textContent ?? "").trim().replace("[edit]", "");
                const tableSubtitle = (findPrevNodeSpecifically(elTable, "h3")?.textContent ?? "").trim().replace("[edit]", "");
                const returnData = {
                    tournaments: null,
                    title: tableTitle,
                    subtitle: tableSubtitle,
                };

                // * 確認 headers 是不是只有一個
                if (headers.length > 1) {
                    // * 如果發現錯誤，找到 table 之前的 h2、h3，來印出錯誤訊息
                    const msg = `❌ Error: Found multiple gridHeader in a table. \n | Title: ${tableTitle}. \n | Subtitle: ${tableSubtitle} \n`;
                    console.error(msg);
                    scrapeError.push({
                        type: "MULTIPLE_TABLE_HEADER",
                        msg,
                    });
                    return returnData;
                }

                // * 抓出 表格的 header 與 row 的文字
                const headerTexts = [...headers[0].querySelectorAll(tableClass[type].cell)]
                    .map((cell, cellIndex) => {
                        // * 跳過 "S" (因為 row 裡面這格跟隔壁格合併了，而這格是 icon，可忽略)
                        const text = (cell?.textContent ?? "").trim();
                        if (text === "S") return null;
                        return text ?? `header-${cellIndex}`;
                    })
                    .filter(i => i);
                const rowsTexts = rows.map(row => row.querySelectorAll(tableClass[type].cell).map(cell => (cell?.textContent ?? "").trim() || "-"));

                // * 把 header 與 row 組合起來
                returnData.tournaments = rowsTexts.reduce((all, row) => {
                    if (row.length !== headerTexts.length) {
                        const msg = "This row length is not match to its header length.";
                        console.error(msg, row);
                        scrapeError.push({
                            type: "ROW_AND_HEADER_LENGTH_ARE_NOT_MATCHING",
                            msg: msg + " row: " + JSON.stringify(row),
                        });
                        return all;
                    }
                    all.push(
                        row.reduce((rowObject, rowItem, rowItemIndex) => {
                            rowObject[headerTexts[rowItemIndex]] = rowItem;
                            return rowObject;
                        }, {})
                    );
                    return all;
                }, []);

                return returnData;
            });
        });

        return { data: [...gridTableObjects, ...divTableObjects], error: scrapeError.length > 0 ? "Scraping tournaments encounter errors." : null, errorStack: scrapeError };
    } catch (error) {
        console.error("fetch tournaments page failed. error: ", error);
        if (axios.isAxiosError(error)) {
            return { data: null, error: `Scrape tournaments failed. ${error?.message ?? error}` };
        }
        return { data: null, error: error?.message ?? error };
    }
}

export { getTournaments };

