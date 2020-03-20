"use strict";

const Doc = use("App/Models/Doc");
const Drive = use("Drive");

class DocController {
  async store({ request }) {
    const body = {};
    request.multipart.field((name, value) => {
      body[name] = value;
    });

    const fileData = {};
    request.multipart.file(
      "file_pic",
      { types: ["image", "application/pdf"], size: "10mb" },
      async file => {
        const ACL = "public-read";
        fileData.contentType = file.headers["content-type"];
        fileData.key = `${new Date().getTime()}-${file.clientName}`;

        fileData.url = await Drive.put(fileData.key, file.stream, {
          ACL,
          ContentType: fileData.contentType
        });
      }
    );

    await request.multipart.process();

    const doc = await Doc.create({
      process_id: body.process_id,
      description: body.description,
      key: fileData.key,
      url: fileData.url,
      content_type: fileData.contentType
    });

    return doc;
  }
}

module.exports = DocController;
