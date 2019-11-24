import React from "react";

const KickerContext = React.createContext({
    state: undefined,
    user: undefined,
    odoo: undefined
});

export const KickerProvider = KickerContext.Provider;
export const KickerConsumer = KickerContext.Consumer;
export default KickerContext;
