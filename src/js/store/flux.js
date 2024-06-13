import { func } from "prop-types";

const getState = ({ getStore, getActions, setStore }) => {
  return {
    store: {
      contacts: [],
    },
    actions: {
      createUser: async () => {
        try {
          const response = await fetch(
            "https://playground.4geeks.com/contact/agendas/gabriel",
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
            }
          );
          if (!response.ok) {
            throw new Error(
              "The profile was not created successfully or it already exists"
            );
          }

          const userData = await response.json();
          console.log("User created", userData);
        } catch (e) {
          console.log(e.message);
        }
      },

      deleteUser: async () => {
        try {
          const response = await fetch(
            "https://playground.4geeks.com/contact/agendas/gabriel",
            {
              method: "DELETE",
              headers: {
                "Content-Type": "application/json",
              },
            }
          );
          if (!response.ok) {
            throw new Error("Unable to delete profile");
          }

          console.log("Agenda deleted successfully");
        } catch (e) {
          console.log(e.message);
        }
      },

      createContact: async ({ name, phone, email, address }) => {
        const auxStore = getStore();
        try {
          const response = await fetch(
            "https://playground.4geeks.com/contact/agendas/gabriel/contacts",
            {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({
                name: name,
                phone: phone,
                email: email,
                address: address,
              }),
            }
          );

          if (!response.ok) {
            throw new Error("New contact was not sent successfully");
          }

          console.log("Contact created successfully");
          const data = await response.json();
          setStore({ contacts: [...auxStore.contacts, data] });
        } catch (e) {
          console.log(e.message);
        }
      },

      getContacts: async () => {
        try {
          const response = await fetch(
            "https://playground.4geeks.com/contact/agendas/gabriel/contacts",
            {
              method: "GET",
              headers: {
                "Content-Type": "application/json",
              },
            }
          );

          if (!response.ok) {
            throw new Error("Agenda contacts were not retrieved successfully");
          }

          const userData = await response.json();
          console.log(userData);
          setStore({ contacts: userData.contacts });

          console.log(getStore().contacts);
        } catch (e) {
          console.log(e.message);
        }
      },

      deleteContact: async (id) => {
        const auxStore = getStore();
        try {
          const response = await fetch(
            `https://playground.4geeks.com/contact/agendas/gabriel/contacts/${id}`,
            {
              method: "DELETE",
            }
          );

          if (!response.ok) {
            throw new Error("The contact was not deleted succesfully");
          }

          const updatedContacts = auxStore.contacts.filter(
            (contact) => contact.id !== id
          );

          setStore({ contacts: updatedContacts });
        } catch (e) {
          console.log(e);
        }
      },

      updateContact: async (id, updatedContact) => {
        const auxStore = getStore();
        try {
          const response = await fetch(
            `https://playground.4geeks.com/contact/agendas/gabriel/contacts/${id}`,
            {
              method: "PUT",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify(updatedContact),
            }
          );

          if (!response.ok) {
            throw new Error("Failed to update contact");
          }

          const userData = await response.json();

          const updatedContacts = auxStore.contacts.map((contact) => {
            if (contact.id == id) {
              return userData;
            }
            return contact;
          });

          setStore({ contacts: updatedContacts });
        } catch (error) {
          console.error(error);
        }
      },
    },
  };
};

export default getState;
