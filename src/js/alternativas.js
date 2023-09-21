/* function exibirGift(){
              $('#allow_gift_messages').attr('checked','checked');
              $('#allow_gift_messages_for_order').attr('checked','checked');
              $('#gift-message-whole-message').attr('disabled',false);
              $j('#allow_gift_messages_for_items').attr('checked','checked');
              $('#allow-gift-message-container').show();
              $('#allow-gift-messages-for-items-container').show();
}
function esconderGift(){
              $('#allow_gift_messages').attr('checked',false);
              $('#allow_gift_messages_for_order').attr('checked',false);
              $('#gift-message-whole-message').attr('disabled','disabled');
              $j('#allow_gift_messages_for_items').attr('checked',false);
              $('#allow-gift-message-container').hide();
              $('#allow-gift-messages-for-items-container').hide();
}
var checado = false;
$('input[name=isgift]').click(function(){
var check1 = 0;
var name_from = $(".nomeb").val();
var name_to = $(".nomea").val();
var isCartaoAdicionadoPagina = $('#cartao_adicionado_radio_productId').val();
var isCartaoAdicionadoVerificacaoMensagem = $('#cartao_adicionado_product_id').val();
if($(this).attr('id') != 'isgift0'){
    checado = false;
}else{
    if(!checado){
        this.checked = true
    }else{
        this.checked = false;
}
    checado = this.checked;
}}); */