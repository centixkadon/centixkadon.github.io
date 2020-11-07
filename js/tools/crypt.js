$(function () {
  window.vm = new Vue({
    el: "#app",

    data: {
      encrypt: false,
      password: "",
      password_status: false,
      input: "",
      output: JSON.parse(localStorage.data || "{}").output || "",
      locked: true,
    },

    watch: {
      password: async function () {
        await this.lock_async(async function () {
          console.log("password");

          if (this.encrypt) {
            await this.encrypt_text();
          }
          if (this.decrypt) {
            await this.decrypt_text();
          }
        });
      },
      input: async function () {
        await this.lock_async(async function () {
          console.log("input");

          await this.encrypt_text();
          this.encrypt = true;
        });
      },
      output: async function () {
        await this.lock_async(async function () {
          console.log("output");

          await this.decrypt_text();
          this.encrypt = false;
        });
      },
    },

    computed: {
      decrypt: function () {
        return !this.encrypt;
      },

      password_status_message: function () {
        if (this.decrypt && this.password) {
          return this.password_status ? "✔" : "❌";
        } else {
          return null;
        }
      },

      encrypt_message: function () {
        return this.encrypt ? "encrypt" : "decrypt";
      },

      input: {
        get: function () {
          return this.input_watched.map(row => row.map(col => col.text));
        },
        set: function (input) {
          this.input_watched = input.map(row => row.map(col => ({ text: col })));
        }
      },
    },

    methods: {
      toggle_encrypt: function () {
        this.encrypt = !this.encrypt;
      },

      encrypt_text: async function () {
        if (this.input && this.password) {
          const decrypt = JSON.stringify({
            input: this.input,
            hash: await this.hash(this.input)
          });
          console.log("decrypt", decrypt);
          const encrypt = await this.aesGcmEncrypt(decrypt, this.password);
          this.output = JSON.stringify(encrypt);

          localStorage.data = JSON.stringify({ output: this.output });
        }
      },

      decrypt_text: async function () {
        if (this.output && this.password) {
          try {
            const encrypt = JSON.parse(this.output);
            const decrypt = JSON.parse(await this.aesGcmDecrypt(encrypt, this.password));
            console.log("decrypt", decrypt);
            if (decrypt.input && decrypt.hash && decrypt.hash === await this.hash(decrypt.input)) {
              this.input = decrypt.input;
              this.password_status = true;
              return;
            }
          } catch (error) { }
          this.password_status = false;
        }
      },

      hash: async function (message) {
        return this.hexToString(await this.sha1(message));
      },

      lock: function (func) {
        if (this.locked) {
          this.locked = false;
          func.apply(this);
          vm.$nextTick(function () {
            this.locked = true;
          });
        }
      },
      lock_async: async function (func) {
        if (this.locked) {
          this.locked = false;
          await func.apply(this);
          vm.$nextTick(function () {
            this.locked = true;
          });
        }
      },

    },
  });

});