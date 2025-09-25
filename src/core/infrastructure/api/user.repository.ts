import { ApiResponseError } from "@/dynamic.types";
import { ApiBaseRepository, Modules } from "./base.repository";
import { TechBase, TechForm } from "@/core/domain/entities/tech";
import { cookies } from "next/headers";
import { UserUpdateNodemailer } from "@/core/application/interfaces/entities/user";
import { MongooseBase } from "../mongoose/types";
import { LoginPayload, VerifyLoginPayloadParams } from "thirdweb/auth";
import { RoleType } from "@/core/domain/entities/role.type";
import { setJwtUC } from "@/core/application/usecases/services/auth";

export class ApiUserRepository extends ApiBaseRepository {
  constructor(baseUrl?: string) {
    super(Modules.USER, baseUrl);
  }
  async readAll() {
    console.log(this.getEndpointModule("readAll"));
    const jwt = (await cookies()).get("jwt");

    const response = await fetch(this.getEndpointModule("readAll"), {
      method: this.endpoints.readAll.method,
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${jwt?.value}`,
      },
    });
    if (!response.ok)
      throw new ApiResponseError("readAll", ApiUserRepository, {
        module: this.module,
        optionalMessage: `Error reading all users: ${response.statusText}`,
      });
    return await response.json();
  }
  async login(data: { payload: VerifyLoginPayloadParams }) {
    const jwt = (await cookies()).get("jwt");
    console.log("login... :", this.getEndpointModule("login"));
    console.log(data.payload);
    const response = await fetch(this.getEndpointModule("login"), {
      method: this.endpoints.login.method,
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${jwt?.value}`,
        "x-signed-payload": `${JSON.stringify(data.payload)}`,
      },
    });
    console.log(response);
    if (!response.ok)
      throw new ApiResponseError("create", ApiUserRepository, {
        module: this.module,
        optionalMessage: `Error creating user: ${response.statusText}`,
      });
    return await response.json();
  }
  async update(tech: UserUpdateNodemailer<MongooseBase>) {
    const jwt = (await cookies()).get("jwt");
    const response = await fetch(this.getEndpointModule("update"), {
      method: this.endpoints.update.method,
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${jwt?.value}`,
        "x-signed-payload": `${JSON.stringify(tech.payload)}`,
      },
      body: JSON.stringify(tech.formData),
    });
    console.log("update user response: ", response);
    if (!response.ok)
      throw new ApiResponseError("update", ApiUserRepository, {
        module: this.module,
        optionalMessage: `Error updating user: ${response.statusText}`,
      });
    const res = await response.json();
    await setJwtUC(tech.payload, {
      nick: res.data.nick,
      id: res.data.id,
      role: res.data.role,
      img: res.data.img || undefined,
    });
    return res;
  }
  async readById(id: string) {
    const response = await fetch(
      this.getEndpointModule("readById").replace(":id", id),
      {
        method: this.endpoints.readById.method,
        headers: {
          "Content-type": "application/json",
        },
      }
    );
    if (!response.ok)
      throw new ApiResponseError("readById", ApiUserRepository, {
        module: this.module,
        optionalMessage: `Error reading user by ID: ${response.statusText}`,
      });
    return await response.json();
  }
  async updateByIdSolicitud(id: string, solicitud: string | null) {
    const jwt = (await cookies()).get("jwt");
    const response = await fetch(this.getEndpointModule("updateSolicitud"), {
      method: this.endpoints.updateSolicitud.method,
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${jwt?.value}`,
      },
      body: JSON.stringify({ id, solicitud }),
    });
    if (!response.ok)
      throw new ApiResponseError("updateByIdSolicitud", ApiUserRepository, {
        module: this.module,
        optionalMessage: `Error updating user request by ID: ${response.statusText}`,
      });
    return await response.json();
  }
  async deleteById(props: {
    payload: {
      signature: `0x${string}`;
      payload: LoginPayload;
    };
    id: string;
    address: string;
  }) {
    const jwt = (await cookies()).get("jwt");
    const response = await fetch(
      this.getEndpointModule("delete").replace(":id", props.id),
      {
        method: this.endpoints.delete.method,
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${jwt?.value}`,
          "x-signed-payload": `${JSON.stringify(props.payload)}`,
        },
        body: JSON.stringify({ id: props.id, address: props.address }),
      }
    );
    if (!response.ok)
      throw new ApiResponseError("deleteById", ApiUserRepository, {
        module: this.module,
        optionalMessage: `Error deleting user by ID: ${response.statusText}`,
      });
    return await response.json();
  }
  async giveRole(props: {
    payload: {
      signature: `0x${string}`;
      payload: LoginPayload;
    };
    id: string;
    solicitud: RoleType.ADMIN;
  }) {
    const jwt = (await cookies()).get("jwt");
    const response = await fetch(this.getEndpointModule("giveRole"), {
      method: this.endpoints.giveRole.method,
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${jwt?.value}`,
        "x-signed-payload": `${JSON.stringify(props.payload)}`,
      },
      body: JSON.stringify({ id: props.id, solicitud: props.solicitud }),
    });
    if (!response.ok)
      throw new ApiResponseError("giveRole", ApiUserRepository, {
        module: this.module,
        optionalMessage: `Error giving role to user: ${response.statusText}`,
      });
    return await response.json();
  }
  async verifyEmail(props: { id: string; verifyToken: string }) {
    const response = await fetch(this.getEndpointModule("verifyEmail"), {
      method: this.endpoints.verifyEmail.method,
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(props),
    });
    if (!response.ok)
      throw new ApiResponseError("verifyEmail", ApiUserRepository, {
        module: this.module,
        optionalMessage: `Error verifying email: ${response.statusText}`,
      });
    return await response.json();
  }
}
