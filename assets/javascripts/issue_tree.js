document.addEventListener("DOMContentLoaded", function () {

    /********************************************
     * SOLO EJECUTAR EN LISTADO DE ISSUES
     *
     * NO ejecutar en:
     * /issues/123
     ********************************************/

    const path =
        window.location.pathname;

    /*
     * SI ES ISSUE INDIVIDUAL
     */

    if (
        /^\/issues\/\d+$/.test(path)
    ) {

        return;

    }

    /*
     * SI NO EXISTE TABLA
     */

    if (
        !document.querySelector(
            "table.list.issues"
        )
    ) {

        return;

    }

    /*
     * TODAS LAS FILAS
     */

    const rows = Array.from(
        document.querySelectorAll(
            "tr.issue"
        )
    );

    if (!rows.length) {
        return;
    }

    /*
     * STORAGE
     */

    const storageKey =
        "issue-tree-collapsed";

    let collapsedNodes =
        JSON.parse(
            localStorage.getItem(
                storageKey
            ) || "[]"
        );

    /*
     * CALCULAR NIVELES
     * usando clases reales Redmine:
     * idnt-0
     * idnt-1
     * idnt-2
     */

    rows.forEach(function(row) {

        let level = 0;

        const classes =
            Array.from(
                row.classList
            );

        const indentClass =
            classes.find(function(c) {

                return c.startsWith(
                    "idnt-"
                );

            });

        if (indentClass) {

            const parsed =
                parseInt(
                    indentClass.replace(
                        "idnt-",
                        ""
                    )
                );

            if (!isNaN(parsed)) {

                level = parsed;

            }

        }

        row.dataset.level =
            level;

    });

    /*
     * OBTENER DESCENDIENTES
     */

    function getDescendants(row) {

        const descendants = [];

        const currentLevel =
            parseInt(
                row.dataset.level
            );

        const index =
            rows.indexOf(row);

        for (
            let i = index + 1;
            i < rows.length;
            i++
        ) {

            const nextLevel =
                parseInt(
                    rows[i]
                    .dataset.level
                );

            if (
                nextLevel <= currentLevel
            ) {
                break;
            }

            descendants.push(
                rows[i]
            );

        }

        return descendants;

    }

    /*
     * OBTENER HIJOS DIRECTOS
     */

    function getDirectChildren(row) {

        const children = [];

        const currentLevel =
            parseInt(
                row.dataset.level
            );

        const index =
            rows.indexOf(row);

        for (
            let i = index + 1;
            i < rows.length;
            i++
        ) {

            const nextLevel =
                parseInt(
                    rows[i]
                    .dataset.level
                );

            if (
                nextLevel <= currentLevel
            ) {
                break;
            }

            if (
                nextLevel ===
                currentLevel + 1
            ) {

                children.push(
                    rows[i]
                );

            }

        }

        return children;

    }

    /*
     * ACTUALIZAR TOGGLE
     */

    function updateToggleText(
        toggle,
        collapsed,
        childCount,
        avgProgress
    ) {

        toggle.innerHTML =
            `${
                collapsed
                ? "▶"
                : "▼"
            } (${childCount}) [${avgProgress}%]`;

    }

    /*
     * INSERTAR TOGGLES
     */

    rows.forEach(function(row) {

        const directChildren =
            getDirectChildren(row);

        if (
            !directChildren.length
        ) {
            return;
        }

        const descendants =
            getDescendants(row);

        const subject =
            row.querySelector(
                "td.subject"
            );

        if (!subject) {
            return;
        }

        if (
            subject.querySelector(
                ".tree-toggle"
            )
        ) {
            return;
        }

        /*
         * KPI
         */

        let totalProgress = 0;

        let progressItems = 0;

        descendants.forEach(
            function(desc) {

                const progressCell =
                    desc.querySelector(
                        "td.done_ratio"
                    );

                if (!progressCell) {
                    return;
                }

                const progressBar =
                    progressCell.querySelector(
                        ".progress-foreground"
                    );

                if (!progressBar) {
                    return;
                }

                const width =
                    progressBar.style.width;

                if (!width) {
                    return;
                }

                const value =
                    parseInt(
                        width.replace(
                            "%",
                            ""
                        )
                    );

                if (!isNaN(value)) {

                    totalProgress +=
                        value;

                    progressItems++;

                }

            }
        );

        const avgProgress =
            progressItems > 0
            ? Math.round(
                totalProgress
                / progressItems
              )
            : 0;

        /*
         * TODOS CERRADOS
         */

        const allClosed =
            descendants.length > 0 &&
            descendants.every(
                function(desc) {

                    return desc.classList.contains(
                        "closed"
                    );

                }
            );

        /*
         * TOGGLE
         */

        const toggle =
            document.createElement(
                "span"
            );

        toggle.classList.add(
            "tree-toggle"
        );

        toggle.style.cursor =
            "pointer";

        toggle.style.fontWeight =
            "bold";

        toggle.style.marginRight =
            "6px";

        /*
         * AUTO COLAPSAR
         */

        if (
            allClosed &&
            !collapsedNodes.includes(
                row.id
            )
        ) {

            collapsedNodes.push(
                row.id
            );

        }

        /*
         * ESTADO
         */

        const isCollapsed =
            collapsedNodes.includes(
                row.id
            );

        toggle.dataset.collapsed =
            isCollapsed
            ? "true"
            : "false";

        updateToggleText(
            toggle,
            isCollapsed,
            directChildren.length,
            avgProgress
        );

        /*
         * INSERTAR
         */

        subject.prepend(toggle);

        /*
         * RESTAURAR ESTADO
         */

        if (isCollapsed) {

            descendants.forEach(
                function(desc) {

                    desc.style.display =
                        "none";

                }
            );

        }

        /*
         * CLICK TOGGLE
         */

        toggle.addEventListener(
            "click",
            function(e) {

                e.preventDefault();

                e.stopPropagation();

                const collapsed =
                    toggle.dataset.collapsed
                    === "true";

                /*
                 * COLAPSAR
                 */

                if (!collapsed) {

                    descendants.forEach(
                        function(desc) {

                            desc.style.display =
                                "none";

                        }
                    );

                    toggle.dataset.collapsed =
                        "true";

                    if (
                        !collapsedNodes.includes(
                            row.id
                        )
                    ) {

                        collapsedNodes.push(
                            row.id
                        );

                    }

                }

                /*
                 * EXPANDIR
                 */

                else {

                    descendants.forEach(
                        function(desc) {

                            desc.style.display =
                                "";

                        }
                    );

                    toggle.dataset.collapsed =
                        "false";

                    collapsedNodes =
                        collapsedNodes.filter(
                            id => id !== row.id
                        );

                }

                updateToggleText(
                    toggle,
                    toggle.dataset.collapsed === "true",
                    directChildren.length,
                    avgProgress
                );

                localStorage.setItem(
                    storageKey,
                    JSON.stringify(
                        collapsedNodes
                    )
                );

            }
        );

    });

    /*
     * BOTÓN OCULTAR CERRADAS
     */

    const hideClosedBtn =
        document.createElement(
            "button"
        );

    hideClosedBtn.innerText =
        "Ocultar cerradas";

    hideClosedBtn.style.marginRight =
        "10px";

    let closedHidden = false;

    hideClosedBtn.addEventListener(
        "click",
        function() {

            closedHidden =
                !closedHidden;

            document
                .querySelectorAll(
                    "tr.issue.closed"
                )
                .forEach(function(row) {

                    if (
                        closedHidden
                    ) {

                        row.style.display =
                            "none";

                    } else {

                        row.style.display =
                            "";

                    }

                });

            hideClosedBtn.innerText =
                closedHidden
                ? "Mostrar cerradas"
                : "Ocultar cerradas";

        }
    );

    /*
     * BOTÓN AGRUPAR POR PARENT
     */

    const groupBtn =
        document.createElement(
            "button"
        );

    groupBtn.innerText =
        "Agrupar por parent";

    groupBtn.style.marginRight =
        "10px";

    groupBtn.addEventListener(
        "click",
        function() {

            const url =
                new URL(
                    window.location.href
                );

            url.searchParams.set(
                "group_by",
                "parent"
            );

            window.location.href =
                url.toString();

        }
    );

    /*
     * BOTÓN EXPANDIR TODO
     */

    const expandBtn =
        document.createElement(
            "button"
        );

    expandBtn.innerText =
        "Expandir todo";

    expandBtn.style.marginRight =
        "10px";

    expandBtn.addEventListener(
        "click",
        function() {

            rows.forEach(
                function(row) {

                    row.style.display =
                        "";

                }
            );

            document
                .querySelectorAll(
                    ".tree-toggle"
                )
                .forEach(function(toggle) {

                    toggle.dataset.collapsed =
                        "false";

                    toggle.innerHTML =
                        toggle.innerHTML
                            .replace(
                                "▶",
                                "▼"
                            );

                });

            collapsedNodes = [];

            localStorage.setItem(
                storageKey,
                JSON.stringify(
                    collapsedNodes
                )
            );

        }
    );

    /*
     * BOTÓN COLAPSAR TODO
     */

    const collapseBtn =
        document.createElement(
            "button"
        );

    collapseBtn.innerText =
        "Colapsar todo";

    collapseBtn.style.marginRight =
        "10px";

    collapseBtn.addEventListener(
        "click",
        function() {

            collapsedNodes = [];

            rows.forEach(
                function(row) {

                    const descendants =
                        getDescendants(
                            row
                        );

                    if (
                        descendants.length
                    ) {

                        collapsedNodes.push(
                            row.id
                        );

                        descendants.forEach(
                            function(desc) {

                                desc.style.display =
                                    "none";

                            }
                        );

                    }

                }
            );

            document
                .querySelectorAll(
                    ".tree-toggle"
                )
                .forEach(function(toggle) {

                    toggle.dataset.collapsed =
                        "true";

                    toggle.innerHTML =
                        toggle.innerHTML
                            .replace(
                                "▼",
                                "▶"
                            );

                });

            localStorage.setItem(
                storageKey,
                JSON.stringify(
                    collapsedNodes
                )
            );

        }
    );

    /*
     * INSERTAR BOTONES
     */

    const contextual =
        document.querySelector(
            ".contextual"
        );

    if (contextual) {

        contextual.appendChild(
            groupBtn
        );

        contextual.appendChild(
            hideClosedBtn
        );

        contextual.appendChild(
            expandBtn
        );

        contextual.appendChild(
            collapseBtn
        );

    }

});
