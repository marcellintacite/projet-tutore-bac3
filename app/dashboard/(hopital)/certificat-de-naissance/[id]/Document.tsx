"use client";

import {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
  Image,
  Font,
  Tspan,
  PDFViewer,
} from "@react-pdf/renderer";
import logo from "../../../../../public/assets/illustration/jpr.png";
import { ResponseCertificat } from "@/types/Certificat";

const Quixote = ({ certificat }: { certificat: ResponseCertificat }) => {
  const dateOption = {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  };

  console.log(
    "img",
    `https://projetutor.onrender.com/${certificat.Certificat.cod_qr}`
  );
  return (
    <Document
      title={`
    certificat de naissance de ${certificat.Certificat.nom_enfant} ${certificat.Certificat.post_nom_enfant} ${certificat.Certificat.prenom_enfant}}    

    `}
    >
      <Page style={styles.body}>
        <View style={styles.congo}>
          <Image
            src={window.location.origin + "/assets/illustration/jpr.png"}
            style={styles.image}
          />
          <Image
            src={window.location.origin + "/assets/illustration/drapeau.png"}
            style={styles.image}
          />
        </View>

        <View style={styles.head}>
          <Text style={styles.title}>
            {certificat.hospital.denom.toUpperCase()}
          </Text>
          <Text style={styles.author}>{certificat.hospital.email}</Text>
          <Text style={styles.author}>
            B.P : {certificat.hospital.boite_postal} |{" "}
            {certificat.terriville.denom}
          </Text>

          <View style={styles.absolute}>
            <Image
              style={styles.image}
              source={
                "https://presidence.cd/uploads/a771e9a5d17203f8712c8f01c3fdc473.png"
              }
            />
          </View>
        </View>
        <View style={styles.content}>
          <Text style={styles.sub}>
            CERTIFICAT DE NAISSANCE No {certificat.Certificat.id}
          </Text>
          <Text style={styles.normal}>
            Je soussigné, Dr. {certificat.Certificat.nom_medecin} , directeur de
            de l'{certificat.hospital.denom} certifie par la présente que la
            nommée {certificat.Certificat.nom_complet_mere};
          </Text>
          <Text style={styles.suite}>
            Femme de {certificat.Certificat.nom_complet_pere} a accouché le{" "}
            {new Date(
              certificat.Certificat.date_nais_enfant
            ).toLocaleDateString()}{" "}
            d’un enfant de sexe{" "}
            {certificat.Certificat.sexe_enfant === "m" ? "masculin" : "feminin"}{" "}
            pesant {certificat.Certificat.poid_enfant}g ayant pour nom{" "}
            {certificat.Certificat.nom_enfant}{" "}
            {certificat.Certificat.post_nom_enfant}{" "}
            {certificat.Certificat.prenom_enfant}.
          </Text>
        </View>
        <View style={styles.footer}>
          <Text style={styles.normal}>
            Fait à {certificat.terriville.denom}, le{" "}
            {new Date(certificat.Certificat.date_deliv_cert).toLocaleDateString(
              "fr-FR",
              {
                day: "numeric",
                month: "long",
                year: "numeric",
              }
            )}
          </Text>

          <View style={styles.sceau}>
            <Text style={styles.normalBold}>Sceau</Text>
            <Text style={styles.normalBold}>Signature</Text>
          </View>
        </View>
        {certificat.Certificat.url_qrcode && (
          <View style={styles.code}>
            <Image
              style={styles.image}
              source={`https://projetutor.onrender.com/${certificat.Certificat.url_qrcode}`}
            />
          </View>
        )}

        <View style={styles.foot}>
          <Text style={styles.header} fixed>
            ~ Certificat de naissance~
          </Text>
        </View>
      </Page>
    </Document>
  );
};

Font.register({
  family: "Oswald",
  src: "https://fonts.gstatic.com/s/oswald/v13/Y_TKV6o8WovbUd3m_X9aAA.ttf",
});

const styles = StyleSheet.create({
  body: {
    paddingTop: 35,
    paddingBottom: 65,
    paddingHorizontal: 35,
    position: "relative",
  },
  congo: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    height: 60,
    backgroundColor: "#eaf4ff",
    padding: 15,
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  title: {
    fontSize: 24,
    textAlign: "center",
    fontFamily: "Oswald",
    marginVertical: 10,
    marginTop: 45,
    fontWeight: "bold",
  },
  sub: {
    color: "#000",
    fontWeight: "extrabold",
    textAlign: "center",
    fontFamily: "Oswald",
    marginBottom: 20,
  },
  head: {
    position: "relative",
  },
  absolute: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 100,
    justifyContent: "center",
    alignItems: "center",
  },
  author: {
    fontSize: 14,

    fontFamily: "Times-Roman",
    textAlign: "center",
    marginBottom: 8,
    textDecoration: "underline",
  },

  text: {
    margin: 12,
    fontSize: 15,
    textAlign: "justify",
    fontFamily: "Oswald",
  },
  image: {
    width: 50,
  },
  header: {
    fontSize: 12,

    textAlign: "center",
    color: "#7d7879",
  },
  pageNumber: {
    position: "absolute",
    fontSize: 12,
    bottom: 30,
    left: 0,
    right: 0,
    textAlign: "center",
    color: "grey",
  },

  content: {
    marginTop: 40,
  },
  footer: {
    marginTop: 60,
  },
  sceau: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 35,
  },

  normal: {
    fontSize: 14,
    textAlign: "justify",
    fontFamily: "Times-Roman",
    marginBottom: 3,
  },
  normalBold: {
    fontSize: 14,
    textAlign: "justify",
    fontFamily: "Times-Roman",
    fontWeight: "bold",
    marginBottom: 3,
  },
  suite: {
    fontSize: 14,
    textAlign: "justify",
    fontFamily: "Times-Roman",
    marginBottom: 10,
  },

  foot: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    height: 50,
    backgroundColor: "#eaf4ff",
    padding: 10,
  },
  code: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
});

export default Quixote;
