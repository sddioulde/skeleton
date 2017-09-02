package controllers;

import javax.ws.rs.*;
import javax.ws.rs.core.MediaType;

/**
 * Created by S2D on 9/1/17.
 */

@Path("/netid")
@Produces(MediaType.TEXT_PLAIN)
public class NetIdController {

    @GET
    public String getNetId() {
        return "sdd65";
    }
}
