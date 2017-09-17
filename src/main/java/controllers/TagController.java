/**
 * Created by S2D on 9/1/17.
 */

package controllers;

import api.CreateTagRequest;
import api.ReceiptResponse;
import api.TagResponse;
import dao.TagDao;
import generated.tables.records.ReceiptsRecord;
import generated.tables.records.TagsRecord;

import javax.validation.Valid;
import javax.validation.constraints.NotNull;
import javax.ws.rs.*;
import javax.ws.rs.core.MediaType;
import java.util.List;
import java.util.logging.Logger;

import static java.util.stream.Collectors.toList;

@Path("/tags")
@Consumes(MediaType.APPLICATION_JSON)
@Produces(MediaType.APPLICATION_JSON)
public class TagController {

    final TagDao tags;

    public TagController(TagDao tags) {
        this.tags = tags;
    }

    @PUT
    @Path("/{tag}")
    //public void addTag(@Valid @NotNull CreateTagRequest tag, @PathParam("tag") String tagName) {
    public void addTag(int receiptId, @PathParam("tag") String tagName) {
        tags.insert(receiptId, tagName);
    }

    @GET
    @Path("/{tag}")
    public List<ReceiptResponse> getReceipts(@PathParam("tag") String tagName) {
        List<ReceiptsRecord> receiptRecords = tags.getAllReceiptsWithTag(tagName);
        return receiptRecords.stream().map(ReceiptResponse::new).collect(toList());
    }

    @GET
    @Path("/receipt/{receiptId}")
    public List<TagResponse> getReceiptTags(@PathParam("receiptId") int receiptId) {
        List<TagsRecord> tagRecords = tags.getAllTagsForReceipt(receiptId);
        return tagRecords.stream().map(TagResponse::new).collect(toList());
    }

}
