const sequelize = require("../../src/db/models/index").sequelize;
const Topic = require("../../src/db/models").Topic;
const Post = require("../../src/db/models").Post;

describe("Topic", () => {
  beforeEach((done) => {
    this.topic;
    this.post;
    sequelize.sync({force: true}).then((res) => {
      Topic.create({
        title: "Expeditions to Alpha Centauri Part 2",
        description: "A compilation of reports from recent visits to the star system Alpha Centauri."
      })
      .then((topic) => {
        this.topic = topic;

        Post.create({
          title: "My second visit to Proxima Centauri b",
          body: "I saw some more rocks.",
          topicId: this.topic.id
        })
        .then((post) => {
          this.post = post;
          done();
        });
      })
      .catch((err) => {
        console.log(err);
        done();
      });
    });
  });

  describe("#create()", () => {
    it("should create a topic object with a title and assigned description", (done) => {
      Topic.create({
        title: "Pros of Cryosleep during the long journey part 2",
        description: "Not having to feel the wait"
      })
      .then((topic) => {
        expect(topic.title).toBe("Pros of Cryosleep during the long journey part 2");
        expect(topic.description).toBe("Not having to feel the wait");
        done();
      })
      .catch((err) => {
        console.log(err);
        done();
      });
    });

    it("should not create a topic with missing title or description", (done) => {
      Topic.create({
        title: "Pros of Cryosleep during the long journey part 2",
        description: "Not having to feel the wait"
      })
      .then((topic) => {
        done();
      })
      .catch((err) => {
        expect(err.message).toContain("Topic.title cannot be null");
        expect(err.message).toContain("Topic.description cannot be null");
        done();
      });
    });
  });

  describe("#getPosts()", () => {
    it("should return the post associated with the topic", (done) => {
      this.topic.getPosts()
      .then((posts) => {
        expect(posts[0].title).toBe("My second visit to Proxima Centauri b");
        done();
      });
    });
  });
});
