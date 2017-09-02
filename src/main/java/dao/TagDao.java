/**
 * Created by S2D on 9/1/17.
 */

package dao;

import generated.tables.records.ReceiptsRecord;
import generated.tables.records.TagsRecord;
import org.jooq.Configuration;
import org.jooq.DSLContext;
import org.jooq.impl.DSL;

import java.util.List;

import static com.google.common.base.Preconditions.checkState;
import static generated.Tables.RECEIPTS;
import static generated.Tables.TAGS;

public class TagDao {

    DSLContext dsl;

    public TagDao(Configuration jooqConfig) {
        this.dsl = DSL.using(jooqConfig);
    }

    public void insert(int receiptId, String tagName) {
        List<TagsRecord> tr = dsl.select().from(TAGS).where(TAGS.RECEIPT_ID.eq(receiptId).and(TAGS.TAG_NAME.eq(tagName))).fetchInto(TagsRecord.class);
        if(!tr.isEmpty()){
            int deleted = dsl.deleteFrom(TAGS).where(TAGS.RECEIPT_ID.eq(receiptId).and(TAGS.TAG_NAME.eq(tagName))).execute();

            checkState(deleted == 1, "Delete tags failed");
        }
        else{
            TagsRecord tagsRecord = dsl
                    .insertInto(TAGS, TAGS.RECEIPT_ID, TAGS.TAG_NAME)
                    .values(receiptId, tagName)
                    .returning(TAGS.ID)
                    .fetchOne();

            checkState(tagsRecord != null, "Insert failed");
        }
    }

    public List<ReceiptsRecord> getAllReceiptsWithTag(String tagName) {
        return dsl.select().from(RECEIPTS).join(TAGS).on(TAGS.RECEIPT_ID.eq(RECEIPTS.ID).and(TAGS.TAG_NAME.eq(tagName))).fetchInto(ReceiptsRecord.class);
    }

}
