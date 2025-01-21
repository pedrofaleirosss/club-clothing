import {
  DocumentData,
  QueryDocumentSnapshot,
  SnapshotOptions,
} from "firebase/firestore";
import ICategory from "../interfaces/category";
import IUser from "../interfaces/user";

export const categoryConverter = {
  toFirestore(category: ICategory): DocumentData {
    return { ...category };
  },
  fromFirestore(
    snapshot: QueryDocumentSnapshot,
    options: SnapshotOptions
  ): ICategory {
    const data = snapshot.data(options);

    return {
      id: data.id,
      displayName: data.displayName,
      imageUrl: data.imageUrl,
      name: data.name,
      products: data.products,
    };
  },
};

export const userConverter = {
  toFirestore(user: IUser): DocumentData {
    return { ...user };
  },
  fromFirestore(
    snapshot: QueryDocumentSnapshot,
    options: SnapshotOptions
  ): IUser {
    const data = snapshot.data(options);

    return {
      id: data.id,
      firstName: data.firstName,
      lastName: data.lastName,
      email: data.email,
      provider: data.provider,
    };
  },
};
