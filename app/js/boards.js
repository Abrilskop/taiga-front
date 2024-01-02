/*
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/.
 *
 * Copyright (c) 2021-present Kaleidos Ventures SL
 */

// Función principal para inicializar el tablero Kanban
function initBoard() {
    // Función de devolución de llamada para eventos
    var eventsCallback = function() {};
    // Objeto para almacenar los observadores de estado del Kanban
    var kanbanStatusObservers = {};

    // Devuelve un objeto con métodos para gestionar el tablero Kanban
    return {
        // Método para establecer la función de devolución de llamada para eventos
        events: function(cb) {
            eventsCallback = cb;
        },
        // Método para añadir una tarjeta al tablero Kanban
        addCard: function(card, statusId, swimlaneId) {
            if (swimlaneId) {
                kanbanStatusObservers[swimlaneId][statusId].observe(card);
            } else {
                kanbanStatusObservers[statusId].observe(card);
            }
        },
        addSwimlane: function(column, statusId, swimlaneId) {
            var options = {
                root: column,
                rootMargin: '0px',
                threshold: 0
            }

            var callback = function(entries) {
                entries = entries.map((entry) => {
                    return {
                        id: Number(entry.target.dataset.id),
                        visible: entry.isIntersecting
                    };
                }).filter((entry) => {
                    return entry.visible
                });

                if (entries.length) {
                    eventsCallback('SHOW_CARD', entries);
                }
            };

            if (swimlaneId) {
                if (!kanbanStatusObservers[swimlaneId]) {
                    kanbanStatusObservers[swimlaneId] = {};
                }

                kanbanStatusObservers[swimlaneId][statusId] = new IntersectionObserver(callback, options);
            } else {
                if (!kanbanStatusObservers[statusId]) {
                    kanbanStatusObservers[statusId] = new IntersectionObserver(callback, options);
                }
            }
        },
    }
}
