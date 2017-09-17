package api;

import com.fasterxml.jackson.annotation.JsonProperty;
import generated.tables.records.TagsRecord;

import java.sql.Time;

/**
 * Created by S2D on 9/1/17.
 */
public class TagResponse {

    @JsonProperty
    Integer id;

    @JsonProperty
    Integer receiptId;

    @JsonProperty
    String tagName;

    @JsonProperty
    Time added;

    public TagResponse(TagsRecord dbRecord) {
        this.id = dbRecord.getId();
        this.tagName = dbRecord.getTagName();
        this.added = dbRecord.getAdded();
        this.receiptId = dbRecord.getReceiptId();
    }
}
