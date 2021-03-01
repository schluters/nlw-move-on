import firebase from '../utils/firebase';

const db = firebase.ref("profiles");

interface profilesProps {
  user: string;
  level: number;
  challenges: number;
  currentxp: number;
  totalxp: number;
}

class ProfilesDataService {
  getAll() {
    return db;
  }

  create(profiles:profilesProps) {
    return db.push(profiles);
  }

  update(key:string, value:profilesProps) {
    return db.child(key).update(value);
  }

  delete(key:string) {
    return db.child(key).remove();
  }

  deleteAll() {
    return db.remove();
  }
}

export default new ProfilesDataService();
