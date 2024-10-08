import { UserOpionionCard } from "./UserOpinionCard";
import UsernameProfilePicture from '../assets/user_default_photo.png'
import "./styles/useropinions.css";

export const UserOpinions = () => {
  const users = [
    {
      username: "Carla G, Desarrolladora de Software",
      opinion:
        "Gracias a Course Commerce, mejoré mis habilidades en programación y conseguí el trabajo de mis sueños. Los instructores son expertos y las lecciones, súper claras.",
      photo: UsernameProfilePicture,
    },
    {
      username: "Martín H., Emprendedor Digital",
      opinion:
        "Los cursos son increíblemente completos y bien organizados. Ya estoy implementando las nuevas estrategias aprendidas en mi negocio.",
      photo: UsernameProfilePicture,
    },
    {
      username: "Ana P., Diseñadora Gráfica",
      opinion:
        "Me encanta la flexibilidad que ofrecen. Como mamá de dos niños, necesito aprender a mi ritmo, y con Course Commerce puedo hacerlo cuando me queda tiempo libre.",
      photo: UsernameProfilePicture,
    },
  ];

  return (
    <section className="user_opinion_section">
      {users.map((user, index) => {
        return (
          <UserOpionionCard
            key={index}
            username={user.username}
            opinion={user.opinion}
            photo={user.photo}
          />
        );
      })}
    </section>
  );
};
