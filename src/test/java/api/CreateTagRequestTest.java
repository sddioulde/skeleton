/**
 * Created by S2D on 9/2/17.
 */

package api;

import io.dropwizard.jersey.validation.Validators;
import org.junit.Test;

import javax.validation.Validator;

import static org.hamcrest.MatcherAssert.assertThat;
import static org.hamcrest.Matchers.hasSize;
import static org.hamcrest.collection.IsEmptyCollection.empty;

public class CreateTagRequestTest {

    private final Validator validator = Validators.newValidator();

    @Test
    public void testValid() {
        CreateTagRequest tag = new CreateTagRequest();
        tag.receiptId = 4;
        tag.tagName = "football";
        assertThat(validator.validate(tag), empty());
    }

    @Test
    public void testMissingTagName() {
        CreateTagRequest tag = new CreateTagRequest();
        tag.receiptId = 4;
        assertThat(validator.validate(tag), empty());
    }

    @Test
    public void testMissingReceiptId() {
        CreateTagRequest tag = new CreateTagRequest();
        tag.tagName = "football";
        // TO DO: check line below hasSize(1)?
        assertThat(validator.validate(tag), hasSize(0));
    }

}
