/*!
 * Mostra um bootstrap modal enquando um download é feito em segundo plano
 * @example <button onclick="javascript:modalDownload('/download', 'arquivo.csv)">Download</button>
 * @example <button onclick="javascript:modalDownload('/download.csv')">Download</button>
 * @author Vinicius de Santana <vinicius.vts@gmail.com>
 */
(function ssw(window, document) {
    class BootstrapModalDownload {
        constructor(_url, _fileName = null) {
            this.url = _url;
            this.fileName = _fileName || _url.split("/").pop().split("?")[0] || 'download';
            this.start()
        }
        // get url() { return this.url; }
        start() {
            if(typeof $ !== 'function') throw new Error('BootstrapModalDownload funciona com bootstrap e JQuery');
            this.createModal();
            this.getUrl();
        }
        getUrl() {
            this.title.innerText = 'Gerando arquivo...';
            this.controller = new AbortController();
            fetch(this.url, { signal: this.controller.signal })
            .then((r) => {
                if(r.ok) return r.blob();
                else throw new Error('Response not OK');
            })
            .then((b) => {
                this.blob = b;
                this.title.innerText = 'Arquivo gerado.';
                this.modalBody.innerHTML = '';
                this.downloadButton.href = URL.createObjectURL(this.blob);
                this.downloadButton.download = this.fileName;
                this.downloadButton.classList.remove('hide');
            })
            .catch((err) => {
                this.title.innerText = 'Houve um erro, tente novamente.';
                this.modalBody.innerHTML = '';
            });
        }
        download() {
            location.assign(this.blobURL);
        }
        closeDownload() {
            this.modal.remove();
            this.controller.abort();
            if(this.blob) URL.revokeObjectURL(this.blob);
        }
        createModal() {
            const htmlBootstrapModal =
                '<div class="modal-dialog">'+
                    '<div class="modal-content">'+
                        '<div class="modal-header">'+
                            '<button type="button" class="close" data-dismiss="modal" aria-label="Close">'+
                                '<span aria-hidden="true">&times;</span>'+
                            '</button>'+
                            '<h5 class="modal-title">Carregando...</h5>'+
                        '</div>'+
                        '<div class="modal-body" style="display:flex">'+
                            '<div class="loader"></div>'+
                        '</div>'+
                        '<div class="modal-footer">'+
                            '<a href="#" download class="btn bg-green waves-effect border-radius-5 download hide">Download</a>'+
                            '<button type="button" class="btn bg-orange waves-effect border-radius-5" data-dismiss="modal">Fechar</button>'+
                        '</div>'+
                    '</div>'+
                '</div>'+
                '<style>'+
                    '.loader{margin:auto;border:10px solid #EAF0F6;border-radius:50%;border-top:10px solid #1565C0;width:50px;height:50px;animation:spinner 1s linear infinite;}'+
                    '@keyframes spinner{0%{transform:rotate(0deg);}100%{transform:rotate(360deg);}}'+
                '</style>';
            const modal = document.createElement('div');
            modal.classList.add('modal', 'fade');
            modal.innerHTML = htmlBootstrapModal;
            const title = modal.querySelector('h5.modal-title');
            document.body.appendChild(modal);
            $(modal).modal('show');
            $(modal).on('hidden.bs.modal', (e)=>{ this.closeDownload(); });
            this.modal = modal;
            this.title = title;
            this.modalBody = modal.querySelector('.modal-body');
            this.downloadButton = modal.querySelector('a.download');
        }
    }
    window.modalDownload = function(url, fileName = null){
        new BootstrapModalDownload(url, fileName);
    }
})(window, document);

 