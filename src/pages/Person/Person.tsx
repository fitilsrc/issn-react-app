import { PersonView } from "@/components/persons/person-view";
import { useParams } from "react-router";

const Person = () => {
  const { personId } = useParams();

  const mockPerson = {
    id: 2,
    pseudonyms: [
      {
        id: 2,
        title: "Snatch",
      }
    ],
    aliases: [
      {
        id: 2,
        firstName: "Jason",
        secondName: "Statham",
        patronymic: "Jasonovich",
        gender: "male",
        birthday: new Date(),
        birthPlace: "London, 1089",
        deathday: new Date(),
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec consequat quam eu nunc tempor, at euismod est ultrices. Nulla tincidunt mi et mauris scelerisque, quis interdum lorem vulputate.",
        citizenship: "UK",
        documents: [
          {
            id: 2,
            title: "Passport",
            series: "HE222234"
          },
          {
            id: 6,
            title: "Driver's license",
            issued: "2024-02-02T11:02:10.895Z",
            series: "23232323"
          },
          {
            id: 3,
            title: "Some Document",
            issued: "2024-02-02T11:02:10.895Z",
            series: "23232323"
          },
          {
            id: 2,
            title: "Passport",
            series: "HE222234"
          },
          // {
          //   id: 6,
          //   title: "Driver's license new test",
          //   issued: new Date("2024-02-02T11:02:10.895Z"),
          //   series: "23232323"
          // },
          // {
          //   id: 3,
          //   title: "Some Document",
          //   issued: new Date("2024-02-02T11:02:10.895Z"),
          //   series: "23232323"
          // },
          // {
          //   id: 2,
          //   title: "Passport",
          //   series: "HE222234"
          // },
          // {
          //   id: 6,
          //   title: "Driver's license new test",
          //   issued: new Date("2024-02-02T11:02:10.895Z"),
          //   series: "23232323"
          // },
          // {
          //   id: 3,
          //   title: "Some Document",
          //   issued: new Date("2024-02-02T11:02:10.895Z"),
          //   series: "23232323"
          // }
        ]
      }
    ]
  };

  return <PersonView person={mockPerson} />;
};

export default Person;
