var Card = function (data, type) {
    return `
    <section class="section--center mdl-grid mdl-grid--no-spacing mdl-shadow--2dp">
        <div class="mdl-card mdl-cell mdl-cell--12-col">
            <div class="mdl-card__supporting-text">
                <h4 class="mdl-cell mdl-cell--12-col">${data.title}</h4>
                <div class="section__text mdl-cell mdl-cell--10-col-desktop mdl-cell--6-col-tablet mdl-cell--3-col-phone">
                    ${data.content}
                </div>
            </div>
            ${data.actions}
        </div>
    </section>
    `
}
module.exports = Card;