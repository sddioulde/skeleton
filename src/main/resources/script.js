/**
 * Created by S2D on 9/16/17.
 */

$(document).ready(function(){

    // base api url
    baseUrl = 'http://ec2-54-152-190-159.compute-1.amazonaws.com/';


    // get and load all receipts
    $.ajax({
        method: "GET",
        url: baseUrl + 'receipts'
        })
        .done(function(receipts){
            console.log(receipts);
            $.each(receipts, function(i, val){
                var merchantName = val.merchantName;
                var value = val.value;
                var created = val.created;
                addReceipt(merchantName, value, created);
            });
        })
        .fail(function(xhr, status, error){
            console.log(error);
        });

    // add a receipt
    $('#add-receipt').click(function(){
        var template =
            '<div id="new-receipt" style="display: block;">\
                <input id="merchant" placeholder="merchant" type="text">\
                <input id="amount" placeholder="amount" type="text">\
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
        var merchantName = $('#merchant').val();
        var value = $('#amount').val();
        var created = new Date();
        var postData = {
            merchant: merchantName,
            amount: value
        };
        $.ajax({
            method: "POST",
            url: baseUrl + 'receipts',
            contentType: 'application/json',
            data: JSON.stringify(postData)
        })
            .done(function(msg){
                var time = created.toTimeString().split(' ')[0];
                comp = time.split(':');
                var hour = (parseInt(comp[0]) + 4) % 24;
                console.log(msg);
                addReceipt(merchantName, value, hour + ':' + comp[1] + ':' + comp[2]);
            })
            .fail(function(xhr, status, error){
                console.log(error);
            });

        $('#new-receipt > input').text("");
        $('#new-receipt').remove();
        $('#add-receipt').show();
    });

    $('.add-tag').click(function(){
        var template = '<input class="tag_input" type="text">';
        $(this).before(template);
        $(this).hide();
    });

    $(document).on('keyup', '.tag_input', function(e){
        var keycode = e.keyCode || e.which;
        if(keycode == 13){
            // do stuff
            var tag = $(this).val();


            $(this).before('<span class="tag"><b>x</b>&nbsp;&nbsp;<i>' + tag + '</i></span>&nbsp;');
            $(this).hide();
            $('.add-tag').show()
        }
    });

    function addReceipt(merchantName, value, created){

        var template =
            '<div class="row receipt">\
                <div class="cell">' + created + '</div>\
                        <div class="cell merchant">' + merchantName + '</div>\
                        <div class="cell amount">' + value + '</div>\
                        <div class="cell tags">\
                            <button class="add-tag">\
                                Add Tag\
                                <i class="fa fa-plus fa-2" aria-hidden="true"></i>\
                            </button>\
                        </div>\
                    </div>';
        $('#receiptList').append(template);
    }

    function toGMT(hour){
        hours = []
    }

});
