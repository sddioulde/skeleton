/**
 * Created by S2D on 9/16/17.
 */

$(document).ready(function(){

    // base api url
    //baseUrl = 'http://ec2-54-152-190-159.compute-1.amazonaws.com/';
    //baseUrl = 'http:localhost:8080/';
    baseUrl = 'http://ec2-52-3-227-123.compute-1.amazonaws.com/';


    // get and load all receipts
    loadReceipts();

    // add a receipt
    $('#add-receipt').click(function(){
        var template =
            '<div id="new-receipt" style="display: block;">\
                <input id="merchant" placeholder="merchant" type="text">\
                <input id="amount" placeholder="amount" type="text">\
                <div class="clearfix">\
                <div id="new-receipt-actions">\
                    <button id="cancel-receipt">Cancel</button>\
                    <button id="save-receipt">Save</button>\
                </div>\
            </div>';
        $(this).after(template);
        $(this).hide();
    });


    $(document).on('click', '#cancel-receipt', function(){
        $('#new-receipt > input').text("");
        $('#new-receipt').remove();
        $('#add-receipt').show();
    });

    // save and add new receipt
    $(document).on('click', '#save-receipt', function(){
        $('#new-receipt-error').remove();
        var merchantName = $('#merchant').val();
        var value = $('#amount').val();
        var postData = {
            merchant: merchantName,
            amount: value
        };
        if(merchantName != '' && value != ''){
            $.ajax({
                method: "POST",
                url: baseUrl + 'receipts',
                contentType: 'application/json',
                data: JSON.stringify(postData)
                })
                .done(function(){
                    loadReceipts();
                    $('#new-receipt > input').text("");
                    $('#new-receipt').remove();
                    $('#add-receipt').show();
                })
                .fail(function(xhr, status, error){
                    if(error)
                        $('#new-receipt').append('<p id="new-receipt-error">Error: ' + error + '</p>');
                    console.log(error);
                });
        }
        else{
            $('#new-receipt').append('<p id="new-receipt-error">Both input fields are required...</p>');
        }

    });

    $(document).on('click', '.add-tag', function(){
        var template = '<input class="tag_input" type="text">';
        $(this).before(template);
        $('.tag_input').focus();
        $(this).hide();
    });

    $(document).on('click', '.tag', function(){
        var tag = $(this).find('i').text();
        toggleTag($(this), tag);
    });

    $(document).on('keyup', '.tag_input', function(e){
        var keycode = e.keyCode || e.which;
        if(keycode == 13){
            if($(this).val() != ''){
                var tag = $(this).val();
                toggleTag($(this), tag);
            }
        }
    });

    function toggleTag(target, tag){
        var receiptId = target.closest('.receipt').attr('id');
        $.ajax({
            method: 'PUT',
            url: baseUrl + 'tags/' + tag,
            contentType: 'application/json',
            data: receiptId
            })
            .done(function(){
                loadReceipts();
            })
            .fail(function(xhr, status, error){
                console.log(xhr, status, error);
            });
    }

    function addReceipt(id, merchantName, value, created){

        var tagSpans = '';
        $.ajax({
            method: 'GET',
            url: baseUrl + 'tags/receipt/' + id,
            async: false
            })
            .done(function(tags){
                $.each(tags, function(i, val){
                    tagSpans += '<span class="tagValue"><b><i class="fa fa-times fa-2" aria-hidden="true"></i></b>&nbsp;&nbsp;<i>' + val.tagName + '</i>&nbsp;</span>&nbsp;';
                });
            })
            .fail(function(xhr, status, error){
                console.log(xhr, status, error);
            });

        var template =
            '<div class="row receipt" id="' + id + '">\
                <div class="cell">' + created + '</div>\
                <div class="cell merchant">' + merchantName + '</div>\
                <div class="cell amount">' + value + '</div>\
                <div class="cell tags">' + tagSpans +
                    '<button class="add-tag">\
                        Add Tag\
                        <i class="fa fa-plus fa-2" aria-hidden="true"></i>\
                    </button>\
                </div>\
            </div>';
        $('#receiptList').append(template);
    }

    function loadReceipts(){
        $('div.receipt').remove();
        $.ajax({
            method: "GET",
            url: baseUrl + 'receipts'
            })
            .done(function(receipts){
                $.each(receipts, function(i, val){
                    var id = val.id;
                    var merchantName = val.merchantName;
                    var value = val.value;
                    var created = val.created;
                    addReceipt(id, merchantName, value, created);
                });
            })
            .fail(function(xhr, status, error){
                console.log(xhr, status, error);
            });
    }

});
