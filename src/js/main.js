var Main = function (data) {
    return `
    <main id="main" class="mdl-layout__content mdl-color--grey-100">     
        <div class="demo-cards">
          ${data.main}
        </div>
    </main>
    `
}

module.exports = Main