<template>
  <div>

    <form @submit.prevent="editArticles(editArticle)" v-if="edit">
        <label>Titulo</label>
        <input type="text" v-model="editArticle.title" class="form-control" placeholder="Titulo..."/>
      
        <label>Descripción</label>
        <textarea v-model="editArticle.description" class="form-control" rows="3" placeholder="Descripción..."></textarea>

        <button type="submit" id="btn-edit" class="mt-3">Editar Articulo</button>
        <button type="submit" @click="edit = false" id="btn-cancel" class="mt-3">Cancelar Editar</button>
    </form>

    <form @submit.prevent="addArticle()" v-if="!edit">
        <label>Titulo</label>
        <input type="text" v-model="article.title" class="form-control" placeholder="Titulo..."/>
      
        <label>Descripción</label>
        <textarea v-model="article.description" class="form-control" rows="3" placeholder="Descripción..."></textarea>

        <button type="submit" class="mt-3">Agregar Articulo</button>
    </form>

    <section>
      <article v-for="(item, index) in articles" :key="index">
        <h3>{{item.title}}</h3>
        <p>{{item.description}}</p>

        <button @click="activeEdit(item._id)" class="btn-warning btn-sm">Editar</button>
        <button @click="deleteArticle(item._id)" class="btn-danger btn-sm mx-2">Eliminar</button>
        <button @click="addFavs(item._id)">Añadir a favoritos</button>
      </article>
    </section>
  </div>
</template>

<script>
export default {
  components: {},
  data() {
    return {
      articles: [],
      article: { title: '', description: ''},
      editArticle: {},
      favArticles: [],
      edit: false
    }
  },

  created() {
    this.getArticles();
  },

  methods: {
    getArticles() {
      this.axios.get('/article')
        .then( res => {
          this.articles = res.data;
        })
        .catch ( e => {
          return e.response
        })
    },

    addArticle() {
      this.axios.post('/createArticle', this.article)
        .then( res => {
          this.articles.push(res.data);
          this.article.title = '';
          this.article.description = '';

          if(this.articles.length === 100) {
            this.articles.shift();
          }
        })
        .catch ( e => {
          return e.response
        })
    },

    editArticles(item) {
      this.axios.put(`/article/${item._id}`, item)
        .then( res => {
          const index = this.articles.findIndex( n => n._id === res.data._id)
          this.articles[index].title = res.data.title;
          this.articles[index].description = res.data.description;
          this.edit = false;
        })

        .catch( e => {
          return e.response;
        })
    },

    activeEdit(id) {
      this.edit = true;
      
      this.axios.get(`/article/${id}`)
        .then( res => {
          this.editArticle = res.data;
        })

        .catch ( e => {
          return e.response
        })
    },

    deleteArticle(id) {
      this.axios.delete(`/article/${id}`)
        .then ( res => {
          const index = this.articles.findIndex( n => n._id === res.data._id);
          this.articles.splice( index, 1);
        })

        .catch ( e => {
          return e.response;
        })
    },

    addFavs(id) {
      this.axios.get(`/article/${id}`)
        .then( res => {
          this.favArticles.push(res.data)
          console.log(this.favArticles)
        })

        .catch( e => {
          return e.response;
        })
    }
  }
}
</script>

<style scoped>

  section {
    display: grid;
    grid-template-columns: 1fr 1fr;
  }

  div section article {
    border: 2px solid black;
    border-radius: 15px;
    height: 40vh;
    width: 35vw;
    margin: auto;
    padding: 5vh;
    margin-bottom: 5vh;
    margin-top: 5vh;
  }

  form input,
  form input,
  form textarea {
    width: 65vw;
    margin: auto;
  }

  form button {
    border: none;
    padding: 1vh;
    background-color: green;
    color: white;
    border-radius: 10px;
  }

  #btn-edit {
    border: none;
    padding: 1vh;
    background-color: darkred;
    color: white;
    border-radius: 10px;
  }

  #btn-cancel {
    border: none;
    padding: 1vh;
    background-color: darkcyan;
    color: white;
    border-radius: 10px;
    margin-left: 1vh;
  }

</style>
