import { Test, TestingModule } from "@nestjs/testing";
import { INestApplication, ValidationPipe  } from "@nestjs/common";
import request from "supertest";
import { AppModule } from "../../app.module";
import { blogDto } from "../dto/blogDto";

describe("BlogsController E2E Test", () => {
  let app: INestApplication;

  const validBlog: blogDto = {
    name: "Dimych",
    description: "incubator",
    websiteUrl: "https://it-incubator.ru"
  };

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule]
    }).compile();

    //создают и инициализируют экземпляр Nest.js приложения
    app = moduleFixture.createNestApplication();
    app.useGlobalPipes(new ValidationPipe());
    await app.init();
  });

  //закрытие приложения после каждого теста
  afterEach(async () => {
    await app.close();
  });

//#1
  it("create a new blogs", () => {
    return request(app.getHttpServer())
      .post("/blogs/")
      .send(validBlog)
      .expect(201)
      .expect((res) => {
        expect(res.body).toHaveProperty("name", validBlog.name);
        expect(res.body).toHaveProperty("description", validBlog.description);
        expect(res.body).toHaveProperty("websiteUrl", validBlog.websiteUrl);
      });
  });

  //#2
  it("get all blogs", async () => {
    //запрос к http- серверу
    const response = await request(app.getHttpServer())
      //отправка запроса с помощью метода
      .get("/blogs")
      //проверка статуса
      .expect(200);
    //проверка на undefined
    expect(response.body).toBeDefined();
  });

  //#3
  it("get blogs by ID", async () => {
    const createdBlogResponse = await request(app.getHttpServer())
      .post("/blogs/")
      .send(validBlog)
      .expect(201);
    const blogId = createdBlogResponse.body.id;
    const response = await request(app.getHttpServer())
      .get(`/blogs/${blogId}`)
      .expect(200);
    expect(response.body).toBeDefined();
    //проверка на соответствие blogsId
    expect(response.body).toHaveProperty("id", blogId);
  });

  //#4
  it("update blogs by ID", async () => {
    const createdBlogResponse = await request(app.getHttpServer())
      .post("/blogs/")
      .send(validBlog)
      .expect(201);
    const blogId = createdBlogResponse.body.id;
    const updatedBlogData: blogDto = {
      name: "Updated Name",
      description: "Updated Description",
      websiteUrl: "https://updated-website-url.com"
    };
    const response = await request(app.getHttpServer())
      .put(`/blogs/${blogId}`)
      .send(updatedBlogData)
      .expect(200);
    expect(response.body).toBeDefined();
    const getResponse = await request(app.getHttpServer())
      .get(`/blogs/${blogId}`)
      .expect(200);
    expect(getResponse.body).toHaveProperty("name", updatedBlogData.name);
    expect(getResponse.body).toHaveProperty("description", updatedBlogData.description);
    expect(getResponse.body).toHaveProperty("websiteUrl", updatedBlogData.websiteUrl);
  });

    //#5
    it("delete blogs by ID", async () => {
      const createdBlogResponse = await request(app.getHttpServer())
        .post("/blogs/")
        .send(validBlog)
        .expect(201);
      const blogId = createdBlogResponse.body.id;
      await request(app.getHttpServer())
        .delete(`/blogs/${blogId}`)
        .expect(204);
      // await request(app.getHttpServer())
      //   .get(`/blogs/${blogId}`)
      //   .expect(404);
  });
});
